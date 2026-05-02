import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  Output,
  ViewChild,
  inject,
  signal
} from '@angular/core';

import { IntroSceneRuntime } from '../../models3D/intro-scene.model';

interface ThreeGlobal {
  Scene: new () => any;
  PerspectiveCamera: new (fov: number, aspect: number, near: number, far: number) => any;
  WebGLRenderer: new (params: Record<string, unknown>) => any;
  BufferGeometry: new () => any;
  Float32BufferAttribute: new (array: Float32Array, itemSize: number) => any;
  PointsMaterial: new (params: Record<string, unknown>) => any;
  Points: new (geometry: any, material: any) => any;
}

interface GsapTimeline {
  call(callback: () => void, params?: unknown, position?: string): GsapTimeline;
  to(target: unknown, vars: Record<string, unknown>, position?: string): GsapTimeline;
}

interface GsapGlobal {
  set(target: unknown, vars: Record<string, unknown>): void;
  timeline(vars: Record<string, unknown>): GsapTimeline;
}

@Component({
  selector: 'app-anprinci',
  standalone: true,
  imports: [],
  templateUrl: './anprinci.html',
  styleUrl: './anprinci.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnprinciComponent implements AfterViewInit, OnDestroy {
  @ViewChild('overlay', { static: true }) private overlayRef?: ElementRef<HTMLElement>;
  @ViewChild('sceneCanvas', { static: true }) private canvasRef?: ElementRef<HTMLCanvasElement>;

  @Output() readonly finished = new EventEmitter<void>();

  protected readonly stage = signal<'boot' | 'scan' | 'identity' | 'exit'>('boot');
  protected readonly binaryCloud = Array.from({ length: 72 }, (_, index) =>
    index % 3 === 0 ? '0' : '1'
  );

  private readonly zone = inject(NgZone);
  private sceneRuntime?: IntroSceneRuntime;
  private fallbackTimeoutId?: number;
  private resizeListener?: () => void;
  private completed = false;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.buildScene();
      this.runAnimationLoop();
      this.playIntroTimeline();

      this.resizeListener = () => this.handleResize();
      window.addEventListener('resize', this.resizeListener, { passive: true });
    });
  }

  ngOnDestroy(): void {
    this.teardownScene();

    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }

    if (this.fallbackTimeoutId) {
      window.clearTimeout(this.fallbackTimeoutId);
    }
  }

  protected skip(): void {
    this.complete();
  }

  private buildScene(): void {
    const three = (window as Window & { THREE?: ThreeGlobal }).THREE;
    const canvas = this.canvasRef?.nativeElement;

    if (!three || !canvas) {
      return;
    }

    const scene = new three.Scene();
    const camera = new three.PerspectiveCamera(58, this.getAspectRatio(canvas), 0.1, 100);
    camera.position.set(0, 0, 4.8);

    const renderer = new three.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight, false);

    const geometry = new three.BufferGeometry();
    const points = 260;
    const positions = new Float32Array(points * 3);

    for (let index = 0; index < points; index += 1) {
      const spread = 2.6;
      positions[index * 3] = (Math.random() - 0.5) * spread * 2;
      positions[index * 3 + 1] = (Math.random() - 0.5) * spread * 2;
      positions[index * 3 + 2] = (Math.random() - 0.5) * spread;
    }

    geometry.setAttribute('position', new three.Float32BufferAttribute(positions, 3));

    const material = new three.PointsMaterial({
      color: 0x00d4ff,
      size: 0.028,
      transparent: true,
      opacity: 0.85
    });

    const particles = new three.Points(geometry, material);
    scene.add(particles);

    this.sceneRuntime = {
      renderer,
      scene,
      camera,
      particles,
      frameId: 0
    };
  }

  private runAnimationLoop(): void {
    const runtime = this.sceneRuntime;
    if (!runtime) {
      return;
    }

    const renderFrame = () => {
      const timeline = performance.now() * 0.001;

      runtime.particles.rotation.y += 0.0016;
      runtime.particles.rotation.x = Math.sin(timeline * 0.42) * 0.06;
      runtime.camera.position.z = 4.65 + Math.sin(timeline * 0.37) * 0.24;
      runtime.renderer.render(runtime.scene, runtime.camera);

      runtime.frameId = window.requestAnimationFrame(renderFrame);
    };

    renderFrame();
  }

  private playIntroTimeline(): void {
    const gsap = (window as Window & { gsap?: GsapGlobal }).gsap;
    const overlay = this.overlayRef?.nativeElement;

    if (!gsap || !overlay) {
      this.fallbackIntro();
      return;
    }

    const glow = overlay.querySelector<HTMLElement>('.anprinci__glow');
    const title = overlay.querySelector<HTMLElement>('.anprinci__title');
    const role = overlay.querySelector<HTMLElement>('.anprinci__role');

    if (title) {
      gsap.set(title, { opacity: 0, y: 22, filter: 'blur(12px)' });
    }

    if (role) {
      gsap.set(role, { opacity: 0, y: 18, filter: 'blur(8px)' });
    }

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        this.zone.run(() => this.complete());
      }
    });

    timeline.call(() => this.zone.run(() => this.stage.set('scan')));

    if (glow) {
      timeline.to(glow, { opacity: 1, duration: 0.85 }, '<');
    }

    if (title) {
      timeline.to(title, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.95 }, '>-0.2');
    }

    timeline.call(() => this.zone.run(() => this.stage.set('identity')));

    if (role) {
      timeline.to(role, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.78 }, '<');
    }

    timeline.to(overlay, { opacity: 0, duration: 1.1, delay: 13.9 });
    timeline.call(() => this.zone.run(() => this.stage.set('exit')), undefined, '>-0.9');
  }

  private fallbackIntro(): void {
    this.zone.run(() => this.stage.set('scan'));

    window.setTimeout(() => {
      this.zone.run(() => this.stage.set('identity'));
    }, 1300);

    this.fallbackTimeoutId = window.setTimeout(() => {
      this.zone.run(() => this.complete());
    }, 15000);
  }

  private complete(): void {
    if (this.completed) {
      return;
    }

    this.completed = true;
    this.stage.set('exit');
    this.finished.emit();
  }

  private handleResize(): void {
    const runtime = this.sceneRuntime;
    const canvas = this.canvasRef?.nativeElement;

    if (!runtime || !canvas) {
      return;
    }

    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    runtime.camera.aspect = width / Math.max(height, 1);
    runtime.camera.updateProjectionMatrix();
    runtime.renderer.setSize(width, height, false);
  }

  private getAspectRatio(canvas: HTMLCanvasElement): number {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    return width / Math.max(height, 1);
  }

  private teardownScene(): void {
    const runtime = this.sceneRuntime;
    if (!runtime) {
      return;
    }

    window.cancelAnimationFrame(runtime.frameId);

    const geometry = runtime.particles.geometry as { dispose?: () => void };
    geometry.dispose?.();

    const material = runtime.particles.material as
      | { dispose?: () => void }
      | Array<{ dispose?: () => void }>;

    if (Array.isArray(material)) {
      material.forEach((entry) => entry.dispose?.());
    } else {
      material.dispose?.();
    }

    runtime.renderer.dispose();
    this.sceneRuntime = undefined;
  }
}


