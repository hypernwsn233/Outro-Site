/**
 * ETEC Galery — Código Principal
 * Estrutura modular, humanizada e organizada para a galeria 3D e modais interativos.
 */

import { INITIAL_STILLS, StillItem } from './data/stills';

// ============================================================================
// 1. Constantes e Configurações
// ============================================================================
const CDN_BASE = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/';
const FILM_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_195107_ed3f055a-3a13-4a71-b743-e10310454246.mp4';

// Lista dinâmica de fotos da galeria
const stills: StillItem[] = [...INITIAL_STILLS];

// ============================================================================
// 2. Elementos DOM
// ============================================================================
const stage = document.getElementById('stage') as HTMLElement;
const world = document.getElementById('world') as HTMLElement;
const orb = document.getElementById('orb') as HTMLElement;
const headline = document.getElementById('headline') as HTMLElement;
const splash = document.getElementById('splash') as HTMLElement | null;
const barEl = document.getElementById('bar') as HTMLElement | null;
const intro = document.getElementById('intro') as HTMLElement | null;
const film = document.getElementById('film') as HTMLVideoElement | null;
const skipBtn = document.getElementById('skip') as HTMLElement | null;
const gridRows = document.getElementById('gridRows') as HTMLElement;
const menuBtn = document.getElementById('menuBtn') as HTMLElement;
const gridBtn = document.getElementById('gridBtn') as HTMLElement;

// Lightbox
const lit = document.getElementById('lit') as HTMLElement;
const litScrim = document.getElementById('litScrim') as HTMLElement;
const litPlate = lit.querySelector('.plate') as HTMLElement;
const litImg = document.getElementById('litImg') as HTMLImageElement;
const litTitle = document.getElementById('litTitle') as HTMLElement;
const litWhere = document.getElementById('litWhere') as HTMLElement;
const litNote = document.getElementById('litNote') as HTMLElement;

// Modais & Ações
const contactModal = document.getElementById('contactModal') as HTMLElement;
const studioModal = document.getElementById('studioModal') as HTMLElement;
const menuContactLink = document.getElementById('menuContactLink') as HTMLElement | null;
const menuStudioLink = document.getElementById('menuStudioLink') as HTMLElement | null;
const cepBadge = document.getElementById('cepBadge') as HTMLElement | null;
const studioForm = document.getElementById('studioForm') as HTMLFormElement | null;
const dropzone = document.getElementById('dropzone') as HTMLElement | null;
const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
const uploadPreview = document.getElementById('uploadPreview') as HTMLImageElement | null;
const dot = document.getElementById('dot') as HTMLElement;
const toast = document.getElementById('toast') as HTMLElement;
const toastMsg = document.getElementById('toastMsg') as HTMLElement;

// ============================================================================
// 3. Estado da Esfera 3D e Câmera
// ============================================================================
interface CardVector {
  x: number;
  y: number;
  z: number;
  lat: number;
  lon: number;
}

let cardNodes: HTMLElement[] = [];
let cardVectors: CardVector[] = [];
let gridFigures: HTMLElement[] = [];
const downscaledUrls: string[] = [];

let sphereRadius = 300;
let cardWidth = 140;
let currentPerspective = 1150;
let lastViewportW = window.innerWidth;
let lastViewportH = window.innerHeight;

let spinAngle = 0;
let tiltAngle = -4;
let camZ = 0;
let camZTarget = 0;
let dragX = 0;
let dragY = 0;
let velX = 0;
let velY = 0;
let isDragging = false;
let focusedIndex = -1;
let currentSourceEl: HTMLElement | null = null;
let currentLitToken = 0;

// Estado de arrasto por ponteiro
let pointerDownX = 0;
let pointerDownY = 0;
let lastPointerX = 0;
let lastPointerY = 0;
let isTouchPointer = false;
let touchDirectionDecided = false;
let dragCardCandidate: HTMLElement | null = null;

// Cursor do mouse
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let dotX = mouseX;
let dotY = mouseY;

// ============================================================================
// 4. Utilitários e Notificações
// ============================================================================
function showToast(msg: string) {
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function getCardDecodeMax(w: number): number {
  if (w <= 380) return 420;
  if (w <= 640) return 520;
  if (w <= 900) return 640;
  return 760;
}

function downscaleImage(url: string, maxDim: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        if (!img.naturalWidth || img.naturalWidth <= maxDim) {
          return resolve(url);
        }
        const scale = maxDim / img.naturalWidth;
        const canvas = document.createElement('canvas');
        canvas.width = maxDim;
        canvas.height = Math.round(img.naturalHeight * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(url);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(url);
            resolve(URL.createObjectURL(blob));
          },
          'image/webp',
          0.88
        );
      } catch {
        resolve(url);
      }
    };
    img.onerror = () => resolve(url);
    img.src = url;
  });
}

// ============================================================================
// 5. Construção dos Cards e Layout Fibonacci
// ============================================================================
export function rebuildCards() {
  orb.innerHTML = '';
  gridRows.innerHTML = '';
  cardNodes = [];
  cardVectors = [];
  gridFigures = [];

  const total = stills.length;
  const GA = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < total; i++) {
    const item = stills[i];
    const y = 1 - (i / (total - 1 || 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * GA;
    const x = Math.cos(theta) * rad;
    const z = Math.sin(theta) * rad;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = (Math.atan2(x, z) * 180) / Math.PI;

    cardVectors.push({ x, y, z, lat, lon });

    // Card na Esfera 3D
    const card = document.createElement('div');
    card.className = 'card' + (item.tall ? ' tall' : '');
    card.dataset.idx = i.toString();

    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.alt = item.title;

    const srcUrl = downscaledUrls[i] || (item.customUrl ? item.customUrl : CDN_BASE + item.id + '_min.webp');
    img.src = srcUrl;
    img.classList.add('in');

    fig.appendChild(img);
    card.appendChild(fig);
    orb.appendChild(card);
    cardNodes.push(card);

    // Card na Grade Plana
    const gFig = document.createElement('figure');
    gFig.dataset.idx = i.toString();
    const gImg = document.createElement('img');
    gImg.alt = item.title;
    gImg.src = srcUrl;
    const gCap = document.createElement('figcaption');
    gCap.textContent = item.title;

    gFig.appendChild(gImg);
    gFig.appendChild(gCap);
    gridRows.appendChild(gFig);
    gridFigures.push(gFig);

    gFig.addEventListener('click', () => {
      openLightbox(i, gFig);
    });
  }

  layoutSphere();
}

export function layoutSphere() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  lastViewportW = w;
  lastViewportH = h;

  const hr = w <= 380 ? 0.38 : w <= 640 ? 0.42 : 0.46;
  const wr = w <= 380 ? 0.48 : w <= 640 ? 0.52 : 0.58;
  const floor = w <= 380 ? 108 : w <= 640 ? 120 : 155;
  sphereRadius = Math.max(floor, Math.min(480, h * hr, w * wr));

  const scale = w <= 380 ? 0.44 : w <= 640 ? 0.46 : 0.47;
  cardWidth = Math.round(Math.max(72, sphereRadius * scale));
  document.documentElement.style.setProperty('--cw', cardWidth + 'px');

  currentPerspective = w <= 380 ? 620 : w <= 640 ? 760 : w <= 900 ? 920 : 1150;
  document.documentElement.style.setProperty('--persp', currentPerspective + 'px');

  for (let i = 0; i < cardNodes.length; i++) {
    const card = cardNodes[i];
    const u = cardVectors[i];
    if (u) {
      card.style.transform = `translate3d(${u.x * sphereRadius}px, ${-u.y * sphereRadius}px, ${u.z * sphereRadius}px) rotateY(${u.lon}deg) rotateX(${u.lat}deg)`;
    }
  }
}

// ============================================================================
// 6. Loop de Renderização e Câmera 3D
// ============================================================================
function renderFrame() {
  const isLit = document.body.classList.contains('lit');

  if (!isDragging && !isLit) {
    dragX += velX;
    dragY += velY;
    velX *= 0.94;
    velY *= 0.94;
    if (Math.abs(velX) < 0.002) velX = 0;
    if (Math.abs(velY) < 0.002) velY = 0;

    // Trava de inclinação (pitch) em ±32 graus
    if (tiltAngle + dragY > 32) dragY = 32 - tiltAngle;
    if (tiltAngle + dragY < -32) dragY = -32 - tiltAngle;
  }

  const maxScroll = window.innerHeight * 0.16;
  const p = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;

  camZTarget = p * Math.min(64, sphereRadius * 0.12);
  camZ += (camZTarget - camZ) * 0.075;

  const sx = tiltAngle + dragY;
  const sy = spinAngle + dragX;

  // Atualização do mundo 3D
  world.style.transform = `translateZ(${camZ}px) rotateY(${sy}deg) rotateX(${sx}deg)`;

  // Contrarretração ótica do título para permanecer no centro exato da esfera
  headline.style.transform = `rotateX(${-sx}deg) rotateY(${-sy}deg) translateZ(${sphereRadius * 0.62}px)`;
  headline.style.opacity = Math.max(0, 1 - p * 0.55).toString();

  const rx = (sx * Math.PI) / 180;
  const ry = (sy * Math.PI) / 180;
  const cosRx = Math.cos(rx);
  const sinRx = Math.sin(rx);
  const cosRy = Math.cos(ry);
  const sinRy = Math.sin(ry);

  const shade = 1 - Math.min(1, p * 1.6);
  const near = currentPerspective * 0.66;

  for (let i = 0; i < cardNodes.length; i++) {
    const card = cardNodes[i];
    const u = cardVectors[i];
    if (!u) continue;

    const cx = u.x;
    const cy = -u.y;
    const cz = u.z;

    const y1 = cy * cosRx - cz * sinRx;
    const z1 = cy * sinRx + cz * cosRx;
    const zf = -cx * sinRy + z1 * cosRy;

    const base = 0.14 + 0.86 * Math.pow((zf + 1) / 2, 0.85);
    let dim = shade * (1 - base);
    const cardDist = zf * sphereRadius + camZ;
    let fade = 1;

    if (cardDist > near) {
      fade = Math.max(0, 1 - (cardDist - near) / 190);
    }

    if (isLit) {
      dim = Math.min(1, dim + 0.78);
      if (i === focusedIndex) {
        fade = 0;
      }
    }

    dim = Math.round(dim * 100) / 100;
    fade = Math.round(fade * 100) / 100;

    const cardAny = card as any;
    if (cardAny._dim !== dim) {
      cardAny._dim = dim;
      card.style.setProperty('--d', dim.toString());
    }
    if (cardAny._fade !== fade) {
      cardAny._fade = fade;
      card.style.opacity = fade.toString();
    }
  }

  requestAnimationFrame(renderFrame);
}

// ============================================================================
// 7. Lightbox FLIP
// ============================================================================
export function openLightbox(idx: number, sourceEl: HTMLElement | null) {
  if (idx < 0 || idx >= stills.length) return;
  focusedIndex = idx;
  currentSourceEl = sourceEl;
  const item = stills[idx];

  litTitle.textContent = item.title;
  litWhere.textContent = item.place;
  litNote.textContent = item.note;

  const thumbUrl = downscaledUrls[idx] || (item.customUrl ? item.customUrl : CDN_BASE + item.id + '_min.webp');
  litImg.src = thumbUrl;

  if (item.customUrl) {
    litImg.src = item.customUrl;
  } else {
    const myToken = ++currentLitToken;
    const fullImg = new Image();
    fullImg.onload = () => {
      if (myToken === currentLitToken && document.body.classList.contains('lit')) {
        litImg.src = CDN_BASE + item.id + '.png';
      }
    };
    fullImg.src = CDN_BASE + item.id + '.png';
  }

  document.body.classList.add('lit');

  if (sourceEl && litPlate) {
    const srcRect = sourceEl.getBoundingClientRect();
    const plateRect = litPlate.getBoundingClientRect();
    const dx = srcRect.left + srcRect.width / 2 - (plateRect.left + plateRect.width / 2);
    const dy = srcRect.top + srcRect.height / 2 - (plateRect.top + plateRect.height / 2);
    const s = Math.max(0.04, srcRect.width / (plateRect.width || 1));

    litPlate.style.transition = 'none';
    litPlate.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
    litPlate.style.opacity = '0';
    litPlate.offsetHeight; // Força reflow
    litPlate.style.transition = '';
    litPlate.style.transform = '';
    litPlate.style.opacity = '';
  }
}

export function closeLightbox() {
  if (!document.body.classList.contains('lit')) return;
  const src = currentSourceEl;
  focusedIndex = -1;
  document.body.classList.remove('lit');

  if (src && litPlate) {
    const srcRect = src.getBoundingClientRect();
    const plateRect = litPlate.getBoundingClientRect();
    const dx = srcRect.left + srcRect.width / 2 - (plateRect.left + plateRect.width / 2);
    const dy = srcRect.top + srcRect.height / 2 - (plateRect.top + plateRect.height / 2);
    const s = Math.max(0.04, srcRect.width / (plateRect.width || 1));

    litPlate.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
    litPlate.style.opacity = '0';
    setTimeout(() => {
      litPlate.style.transition = 'none';
      litPlate.style.transform = '';
      litPlate.style.opacity = '';
      litPlate.offsetHeight;
      litPlate.style.transition = '';
    }, 640);
  }
  currentSourceEl = null;
}

// ============================================================================
// 8. Modais: Localização & Studio de Upload
// ============================================================================
export function openModal(modal: HTMLElement) {
  modal.classList.add('active');
  document.body.classList.add('modal-open');
  toggleMenu(false);
}

export function closeModal(modal: HTMLElement) {
  modal.classList.remove('active');
  if (!contactModal.classList.contains('active') && !studioModal.classList.contains('active')) {
    document.body.classList.remove('modal-open');
  }
}

export function toggleMenu(force?: boolean) {
  const isOpen = typeof force === 'boolean' ? force : !document.body.classList.contains('menu-open');
  if (isOpen) {
    document.body.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
  } else {
    document.body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
}

export function toggleGrid(force?: boolean) {
  const isGrid = typeof force === 'boolean' ? force : !document.body.classList.contains('gridview');
  if (isGrid) {
    document.body.classList.add('gridview');
  } else {
    document.body.classList.remove('gridview');
  }
}

// ============================================================================
// 9. Inicialização e Eventos
// ============================================================================
function initEventListeners() {
  // Eventos de arrastar na esfera 3D
  stage.addEventListener('pointerdown', (e) => {
    if (document.body.classList.contains('lit') || document.body.classList.contains('modal-open')) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    dragCardCandidate = el ? (el.closest('.card') as HTMLElement) : null;
    pointerDownX = e.clientX;
    pointerDownY = e.clientY;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    velX = 0;
    velY = 0;

    if (e.pointerType === 'touch') {
      isTouchPointer = true;
      touchDirectionDecided = false;
      isDragging = false;
    } else {
      isTouchPointer = false;
      touchDirectionDecided = true;
      isDragging = true;
      try {
        stage.setPointerCapture(e.pointerId);
      } catch {}
    }
  });

  stage.addEventListener('pointermove', (e) => {
    if (!isTouchPointer && !isDragging) return;
    const dx = e.clientX - lastPointerX;
    const dy = e.clientY - lastPointerY;
    const totalDx = e.clientX - pointerDownX;
    const totalDy = e.clientY - pointerDownY;
    const dist = Math.hypot(totalDx, totalDy);

    if (isTouchPointer && !touchDirectionDecided) {
      if (dist >= 10) {
        touchDirectionDecided = true;
        if (Math.abs(totalDy) > Math.abs(totalDx) * 1.15) {
          isDragging = false;
          dragCardCandidate = null;
          return;
        } else {
          isDragging = true;
          try {
            stage.setPointerCapture(e.pointerId);
          } catch {}
        }
      } else {
        return;
      }
    }

    if (isDragging) {
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      velX = dx * 0.13;
      velY = dy * 0.13;
      dragX += velX;
      dragY += velY;

      if (tiltAngle + dragY > 32) dragY = 32 - tiltAngle;
      if (tiltAngle + dragY < -32) dragY = -32 - tiltAngle;
    }
  });

  function onPointerEnd(e: PointerEvent) {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const slop = isCoarse ? 14 : 6;
    const dist = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);

    if (stage.hasPointerCapture && stage.hasPointerCapture(e.pointerId)) {
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch {}
    }

    if (dist <= slop && dragCardCandidate) {
      const idx = parseInt(dragCardCandidate.dataset.idx || '', 10);
      if (!isNaN(idx)) {
        openLightbox(idx, dragCardCandidate);
      }
    }

    isDragging = false;
    isTouchPointer = false;
    dragCardCandidate = null;
  }

  stage.addEventListener('pointerup', onPointerEnd);
  stage.addEventListener('pointercancel', onPointerEnd);

  // Rolagem para zoom dolly
  window.addEventListener(
    'scroll',
    () => {
      const maxScroll = window.innerHeight * 0.16;
      if (window.scrollY > maxScroll) {
        window.scrollTo(0, maxScroll);
      }
      const p = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      if (p > 0.02) {
        document.body.classList.add('deep');
      } else {
        document.body.classList.remove('deep');
      }
    },
    { passive: true }
  );

  // Redimensionamento de tela
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (Math.abs(w - lastViewportW) > 20 || Math.abs(h - lastViewportH) > 20) {
      layoutSphere();
    }
  });

  window.addEventListener('orientationchange', () => setTimeout(layoutSphere, 220));
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', layoutSphere);
    window.visualViewport.addEventListener('scroll', layoutSphere);
  }

  // Controles do Lightbox
  const litCloseBtn = lit.querySelector('[data-close]');
  if (litCloseBtn) litCloseBtn.addEventListener('click', closeLightbox);
  if (litScrim) litScrim.addEventListener('click', closeLightbox);

  // Controles do Menu
  menuBtn.addEventListener('click', () => toggleMenu());
  gridBtn.addEventListener('click', () => toggleGrid());

  document.querySelectorAll('[data-grid]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu(false);
      toggleGrid(true);
    });
  });

  document.querySelectorAll('[data-close-menu]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu(false);
    });
  });

  // Links do Menu para Modais
  if (menuContactLink) {
    menuContactLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(contactModal);
    });
  }

  if (menuStudioLink) {
    menuStudioLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(studioModal);
    });
  }

  // Fechamento dos Modais
  document.querySelectorAll('[data-close-contact]').forEach((el) => {
    el.addEventListener('click', () => closeModal(contactModal));
  });

  document.querySelectorAll('[data-close-studio]').forEach((el) => {
    el.addEventListener('click', () => closeModal(studioModal));
  });

  // Copiar CEP
  if (cepBadge) {
    cepBadge.addEventListener('click', () => {
      navigator.clipboard.writeText('09751-000').then(() => {
        showToast('CEP 09751-000 copiado para a área de transferência!');
      }).catch(() => {
        showToast('CEP: 09751-000');
      });
    });
  }

  // Tecla ESC para fechar modais / lightbox / menus
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (contactModal.classList.contains('active')) {
        closeModal(contactModal);
        return;
      }
      if (studioModal.classList.contains('active')) {
        closeModal(studioModal);
        return;
      }
      if (document.body.classList.contains('lit')) {
        closeLightbox();
        return;
      }
      if (document.body.classList.contains('menu-open')) {
        toggleMenu(false);
        return;
      }
      if (document.body.classList.contains('gridview')) {
        toggleGrid(false);
        return;
      }
    }
  });

  // Cursor customizado
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        mouseX = e.clientX;
        mouseY = e.clientY;
        const target = e.target as HTMLElement | null;
        if (target && target.closest && target.closest('.card, a, button, #grid figure, .dropzone, .cep-badge')) {
          dot.classList.add('wide');
        } else {
          dot.classList.remove('wide');
        }
      }
    },
    { passive: true }
  );

  function updateCursor() {
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);
}

// ============================================================================
// 10. Upload no Studio
// ============================================================================
function initStudioUpload() {
  if (!dropzone || !fileInput || !studioForm || !uploadPreview) return;

  let selectedImageBase64: string | null = null;

  function handleFileSelect(file: File) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Por favor, selecione um arquivo de imagem válido.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImageBase64 = e.target?.result as string;
      if (uploadPreview) {
        uploadPreview.src = selectedImageBase64;
        uploadPreview.style.display = 'block';
      }
      const textEl = dropzone?.querySelector('.dropzone-text');
      if (textEl) textEl.textContent = file.name;
    };
    reader.readAsDataURL(file);
  }

  fileInput.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      handleFileSelect(target.files[0]);
    }
  });

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  });

  studioForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedImageBase64) {
      showToast('Por favor, adicione uma foto antes de publicar.');
      return;
    }

    const titleInput = document.getElementById('photoTitle') as HTMLInputElement;
    const placeInput = document.getElementById('photoPlace') as HTMLInputElement;
    const noteInput = document.getElementById('photoNote') as HTMLTextAreaElement;
    const formatInput = document.getElementById('photoFormat') as HTMLSelectElement;

    const title = titleInput.value.trim();
    const place = placeInput.value.trim();
    const note = noteInput.value.trim();
    const format = formatInput.value;

    const newRecord: StillItem = {
      id: 'custom_' + Date.now(),
      title: title,
      place: place,
      note: note,
      tall: format === 'portrait',
      customUrl: selectedImageBase64
    };

    stills.unshift(newRecord);
    downscaledUrls.unshift(selectedImageBase64);

    rebuildCards();

    studioForm.reset();
    if (uploadPreview) uploadPreview.style.display = 'none';
    selectedImageBase64 = null;
    const textEl = dropzone?.querySelector('.dropzone-text');
    if (textEl) textEl.textContent = 'Arraste uma foto ou clique para selecionar';

    closeModal(studioModal);
    showToast(`"${title}" foi adicionada com sucesso ao acervo 3D!`);
  });
}

// ============================================================================
// 11. Carregamento de Recursos e Abertura
// ============================================================================
function initAssetsAndIntro() {
  const totalInitialAssets = stills.length + 1;
  let loadedAssets = 0;
  const startTime = performance.now();
  let splashDone = false;

  function checkSplashReady() {
    if (splashDone) return;
    const elapsed = performance.now() - startTime;
    if (loadedAssets >= totalInitialAssets || elapsed >= 9000) {
      if (elapsed < 1150) {
        setTimeout(checkSplashReady, 1150 - elapsed);
        return;
      }
      finishSplash();
    }
  }

  function updateSplashProgress() {
    loadedAssets++;
    const prog = Math.min(1, loadedAssets / totalInitialAssets);
    if (barEl) {
      barEl.style.transform = `scaleX(${prog})`;
    }
    checkSplashReady();
  }

  function finishSplash() {
    if (splashDone || !splash) return;
    splashDone = true;
    if (barEl) barEl.style.transform = 'scaleX(1)';
    setTimeout(() => {
      splash.classList.add('out');
      startFilm();
      setTimeout(() => {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
      }, 950);
    }, 250);
  }

  setTimeout(finishSplash, 9000);

  // Redimensionamento inicial das fotos padrão
  const decodeCap = getCardDecodeMax(window.innerWidth);
  stills.forEach((item, idx) => {
    const thumbUrl = CDN_BASE + item.id + '_min.webp';
    downscaleImage(thumbUrl, decodeCap).then((finalUrl) => {
      downscaledUrls[idx] = finalUrl;
      if (cardNodes[idx]) {
        const sphereImg = cardNodes[idx].querySelector('img');
        const gridImg = gridFigures[idx]?.querySelector('img');
        if (sphereImg) sphereImg.src = finalUrl;
        if (gridImg) gridImg.src = finalUrl;
      }
      updateSplashProgress();
    });
  });

  // Vídeo de introdução
  if (film && intro) {
    film.src = FILM_URL;
    film.muted = true;
    film.defaultMuted = true;
    film.playsInline = true;
    film.setAttribute('webkit-playsinline', '');

    film.addEventListener('loadeddata', () => updateSplashProgress(), { once: true });
    film.addEventListener('error', () => {
      intro.classList.add('novideo');
      updateSplashProgress();
      setTimeout(revealPage, 1300);
    }, { once: true });
  }

  let pageRevealed = false;
  function revealPage() {
    if (pageRevealed || !intro) return;
    pageRevealed = true;
    intro.classList.add('closing');
    document.body.classList.remove('locked');
    document.documentElement.style.overflow = '';

    layoutSphere();
    requestAnimationFrame(layoutSphere);
    setTimeout(() => {
      layoutSphere();
      document.body.classList.add('revealed');
      intro.classList.add('gone');
      setTimeout(() => {
        if (intro.parentNode) intro.parentNode.removeChild(intro);
      }, 700);
    }, 1000);
  }

  function startFilm() {
    if (!film) {
      revealPage();
      return;
    }
    if (film.currentTime > 0.05) film.currentTime = 0;
    film.playbackRate = 2;

    const playPromise = film.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const gesturePlay = () => {
          film.play().catch(() => {});
          window.removeEventListener('pointerdown', gesturePlay);
          window.removeEventListener('keydown', gesturePlay);
          window.removeEventListener('touchstart', gesturePlay);
        };
        window.addEventListener('pointerdown', gesturePlay, { once: true });
        window.addEventListener('keydown', gesturePlay, { once: true });
        window.addEventListener('touchstart', gesturePlay, { once: true });
        setTimeout(() => {
          if (film.paused) revealPage();
        }, 2600);
      });
    }

    film.addEventListener('play', () => { film.playbackRate = 2; });
    film.addEventListener('playing', () => {
      film.playbackRate = 2;
      const dur = film.duration && isFinite(film.duration) ? film.duration : 6;
      const remaining = Math.max(0.3, (dur - film.currentTime - 0.45) / 2);
      setTimeout(revealPage, remaining * 1000);
    }, { once: true });

    film.addEventListener('ended', revealPage, { once: true });
    setTimeout(revealPage, 14000);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', () => revealPage());
  }
}

// ============================================================================
// 12. Execução
// ============================================================================
rebuildCards();
renderFrame();
initEventListeners();
initStudioUpload();
initAssetsAndIntro();
