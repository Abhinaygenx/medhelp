# Performance & Build Testing Report - Hospital Management System

## Factual Performance Metrics

> **Environment Note:** Formal browser performance profiling (Lighthouse / FPS trace) was not executed because performance profiling tooling was unavailable in the current headless terminal environment. Factual build and bundle metrics are reported below.

### 1. Build Performance Metrics

| Metric | Result | Verification Method | Status |
|---|---|---|---|
| **Vite Transformation Time** | 706 ms | `npm run build` console output | PASS |
| **Modules Transformed** | 2,457 modules | Vite build pipeline summary | PASS |
| **Build Exit Code** | `0` (Success) | CLI terminal verification | PASS |
| **Build Errors** | `0` errors | Vite compiler check | PASS |
| **Lint Exit Code** | `0` (Success) | Oxlint CLI verification | PASS |
| **Lint Errors** | `0` errors | Oxlint engine check | PASS |
| **Lint Warnings** | 160 warnings (Unused imports/vars) | Oxlint engine check | PASS |

### 2. Production Asset Bundle Breakdown

| Asset Path | Uncompressed Size | Gzip Compressed Size | Purpose |
|---|---|---|---|
| `dist/index.html` | 1.16 kB | 0.63 kB | SPA HTML Entry Document |
| `dist/assets/index-D0d5aMYW.css` | 84.30 kB | 13.63 kB | Compiled Tailwind CSS Design System |
| `dist/assets/PrescriptionModal-*.js` | 7.44 kB | 2.02 kB | Lazy-loaded Prescription Modal Chunk |
| `dist/assets/TeleconsultationModal-*.js` | 9.81 kB | 3.04 kB | Lazy-loaded Telehealth Video Chunk |
| `dist/assets/index-CA5h6-5q.js` | 1,476.68 kB | 406.75 kB | Core SPA JavaScript Bundle |

### 3. Optimization Architecture Features

1. **Code Splitting & Lazy Loading:**
   - Heavy modal components (`PrescriptionModal`, `TeleconsultationModal`) are split using React `lazy()` and `<Suspense>`, reducing initial page bundle payload.
2. **CSS Optimization:**
   - Tailwind CSS utility classes compiled down to a single 13.63 kB (gzip) stylesheet.
3. **Asset Compression:**
   - Production JavaScript gzipped footprint reduced from 1.47 MB to 406 kB for network delivery.
