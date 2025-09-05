# 📁 Estrutura de Documentação - SongCraft AI

## 🗂️ **Organização da Pasta /docs**

```
docs/
├── 📁 images/                    # Screenshots e mockups
│   ├── 🖼️ landing.png           # Landing page hero
│   ├── 🖼️ dashboard.png         # Dashboard overview
│   ├── 🖼️ transcription.png     # Upload & transcription
│   ├── 🖼️ practice.png          # Practice interface
│   ├── 🖼️ progress.png          # Analytics dashboard
│   ├── 🖼️ settings.png          # User settings
│   ├── 🖼️ architecture.png      # System architecture
│   └── 🖼️ user-flow.png         # User journey
├── 📄 setup.md                  # Setup completo
├── 📄 architecture.md           # Arquitetura técnica
├── 📄 api.md                    # API documentation
├── 📄 design-system.md          # Design system
├── 📄 deploy.md                 # Deploy guide
├── 📄 contributing.md           # Como contribuir
└── 📄 user-flow.md              # Jornada do usuário
```

---

## 🖼️ **Especificações das Interfaces**

### **1. Landing Page (`landing.png`)**

```
┌─────────────────────────────────────────────┐
│  [LOGO] SongCraft AI    [Sobre] [Login] [Signup] │
├─────────────────────────────────────────────┤
│                                             │
│     🎵 TRANSFORME QUALQUER MÚSICA          │
│        EM SUA PRÓXIMA LIÇÃO                │
│                                             │
│  IA avançada para transcrição musical,     │
│  aprendizado personalizado e prática       │
│  interativa                                │
│                                             │
│  [▶️ Começar Grátis]  [📺 Ver Demo]        │
│                                             │
│  ⭐⭐⭐⭐⭐ 1.000+ músicos aprendendo      │
│                                             │
├─────────────────────────────────────────────┤
│  🤖 TRANSCRIÇÃO → 🎹 TUTORIAL → 📊 PROGRESSO │
│     INTELIGENTE    PERSONALIZADO   DETALHADO │
│                                             │
├─────────────────────────────────────────────┤
│              [DEMO INTERATIVO]              │
│  ┌─────────────────────────────────────┐   │
│  │ 1. 📁 Upload áudio → MP3, WAV      │   │
│  │ 2. 🧠 IA processa → 30-60s         │   │
│  │ 3. 🎼 Partitura + Tutorial gerados │   │
│  └─────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│  💰 PREÇOS: Free | Pro R$29 | Studio R$59  │
│                                             │
├─────────────────────────────────────────────┤
│  [Footer com links sociais e legais]       │
└─────────────────────────────────────────────┘
```

### **2. Dashboard (`dashboard.png`)**

```
┌─ SIDEBAR ─┬─────── MAIN CONTENT ──────────┐
│ 🎵 SongCraft │  👋 Bem-vindo, João!           │
│           │                              │
│ 🏠 Dashboard │  ⚡ AÇÕES RÁPIDAS             │
│ ➕ Transcrever │  ┌──────┬──────┬──────┐      │
│ 📚 Músicas   │  │ Nova │ Cont.│ Ver  │      │
│ 🎹 Prática   │  │Trans.│Prát. │Todas │      │
│ 📊 Progresso │  └──────┴──────┴──────┘      │
│ ⚙️ Config.   │                              │
│           │  📊 ESTATÍSTICAS SEMANAIS      │
│───────────│  ┌─────┬─────┬─────┬─────┐    │
│ 👤 João    │  │245m │ 87% │ 5🔥 │ 3🎵 │    │
│ 💼 Pro     │  │Tempo│Prec.│Seq. │Mús. │    │
└───────────┤  └─────┴─────┴─────┴─────┘    │
            │                              │
            │  🎵 MÚSICAS RECENTES          │
            │  ┌────────────────────────┐   │
            │  │ 🎹 All of Me - 87% ▶️  │   │
            │  │ 🎸 Perfect - 34% ▶️     │   │
            │  │ 🎹 Imagine - 100% ✅    │   │
            │  └────────────────────────┘   │
            │                              │
            │  🏆 META SEMANAL: 245/300min │
            │  ████████░░ 82%             │
            └──────────────────────────────┘
```

### **3. Transcription Interface (`transcription.png`)**

```
┌─────────────────────────────────────────────┐
│  ← Voltar    🎵 Nova Transcrição            │
├─────────────────────────────────────────────┤
│                                             │
│        📁 ARRASTE SEU ARQUIVO DE ÁUDIO      │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │        🎵                           │   │
│  │   ou clique para selecionar        │   │
│  │                                     │   │
│  │  MP3, WAV, M4A, OGG                │   │
│  │  Máximo: 10MB | 5 minutos          │   │
│  │                                     │   │
│  │    [📁 Escolher Arquivo]           │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  💡 DICAS PARA MELHOR RESULTADO:           │
│  • Áudios com piano ou voz solo            │
│  • Evite muito ruído de fundo              │
│  • Qualidade alta = transcrição precisa    │
│                                             │
│                                             │
│  ┌── PROCESSANDO ──────────────────────┐   │
│  │ 🎵 Detectando notas... 🎹            │   │
│  │ ████████████████░░░░░░ 70%          │   │
│  │                                     │   │
│  │ ⚙️ Gerando versões...               │   │
│  │ 📊 Analisando harmonia...           │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### **4. Practice Interface (`practice.png`)**

```
┌─── PRACTICE MODE: All of Me ────────────────┐
│ ← Voltar  ⏱️2:34  🎯87%  ⚡5    [⚙️Settings] │
├─────────────────────────────────────────────┤
│  📊 PROGRESSO: Seção 2/6 - Verso 1         │
│  ████████░░░░░░░░░░░░░░░░░░░░ 35%           │
├─────────────────────────────────────────────┤
│                                             │
│        🎼 PARTITURA INTERATIVA              │
│  ┌─────────────────────────────────────┐   │
│  │     ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫      │   │
│  │  🔴 Nota atual destacada           │   │
│  │     ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫      │   │
│  │                                     │   │
│  │  💡 DICA: Mantenha dedos curvados  │   │
│  └─────────────────────────────────────┘   │
│                                             │
├───── CONTROLES ─────────────────────────────┤
│     ⏮️  [▶️/⏸️]  ⏭️  ⏹️               │
│                                             │
│  🎵 Velocidade: 80 BPM  [Reset 120]        │
│  ░░░░░░█░░░░░░░░░░░░░░░░░░░░░░░            │
│                                             │
│  🔊 Volume: 75%                            │
│  ░░░░░░░░░░░░░█░░░░░░░░░░░░░░░              │
│                                             │
├─ SIDEBAR ──┬────────────────────────────────┤
│ 📍 ATUAL:  │  ⚙️ CONFIGURAÇÕES              │
│ Verso 1    │  □ Metrônomo                   │
│ 4 compassos│  ☑ Modo Lento                  │
│            │  ☑ Mostrar Dicas               │
│ [⭐ Completa]│  □ Avançar Auto               │
│            │                               │
│ 📋 SEÇÕES: │  🎯 OBJETIVOS HOJE:            │
│ ✅ Intro   │  • Completar Verso 1           │
│ 🔄 Verso 1 │  • Praticar 20 minutos         │
│ ⭕ Chorus  │  • Precisão > 85%              │
│ ⭕ Verso 2 │                               │
└────────────┴────────────────────────────────┘
```

### **5. Progress Dashboard (`progress.png`)**

```
┌──────────── MEU PROGRESSO ─────────────────┐
│  📊 Analytics  📥 Export  📤 Share          │
├─────────────────────────────────────────────┤
│  ⏱️TEMPO   🎯PRECISÃO  🔥STREAK  ⭐MÚSICAS  │
│   245min    87.5%      5 dias    8         │
│   +15%      +3%        Record:12  3 novas  │
├─────────────────────────────────────────────┤
│                                             │
│  📈 PRÁTICA SEMANAL                        │
│  ┌─────────────────────────────────────┐   │
│  │  60│                    ██          │   │
│  │  40│        ██    ██    ██          │   │
│  │  20│  ██    ██    ██    ██    ██    │   │
│  │   0└─D──S──T──Q──Q──S──S──────────  │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  🎵 MÚSICAS POR STATUS:                    │
│  ┌─────────────────────────────────────┐   │
│  │ 🟢 Dominadas (3)    ████████░░      │   │
│  │ 🔵 Praticando (4)   ████████████    │   │
│  │ 🟡 Iniciadas (1)    ██░░░░░░░░░░    │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  🏆 CONQUISTAS RECENTES:                   │
│  🔥 Primeira Semana  🎹 Master Acorde F     │
│  ⚡ 120 BPM Speed    📚 5 Músicas          │
│                                             │
│  💡 INSIGHTS PERSONALIZADOS:               │
│  • Sua precisão melhora 12% em sessões +25min │
│  • Piano é seu instrumento mais forte      │
│  • Pratique manhãs para melhor performance │
└─────────────────────────────────────────────┘
```

### **6. Settings (`settings.png`)**

```
┌─────────────── CONFIGURAÇÕES ──────────────┐
│  👤Perfil  ⚙️Pref  🔔Notif  💳Plano  🔒Priv │
├─────────────────────────────────────────────┤
│                                             │
│  👤 INFORMAÇÕES PESSOAIS                   │
│  ┌─────────────────────────────────────┐   │
│  │     [👤]                            │   │
│  │  Alterar Foto                       │   │
│  │                                     │   │
│  │  Nome: [João Silva]                 │   │
│  │  Email: [joao@email.com]            │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  🎹 INSTRUMENTOS                           │
│  [🎹Piano] [🎸Violão] [ Violino] [ Bateria] │
│                                             │
│  📊 NÍVEL MUSICAL                          │
│  ⚪ Iniciante  ⚫ Intermediário  ⚪ Avançado │
│                                             │
│  🎯 META SEMANAL                           │
│  ░░░░░░█░░░░░░░░░░░░░░  300 min            │
│                                             │
│  🎵 CONFIGURAÇÕES DE ÁUDIO                 │
│  Volume Geral:     ░░░░░░░░█░░░░ 80%       │
│  Volume Metrônomo: ░░░░░░█░░░░░░ 60%       │
│  ☑ Click Track   ☑ Auto Play              │
│                                             │
│  🎹 CONFIGURAÇÕES DE PRÁTICA               │
│  Tempo Padrão: ░░░░█░░░░░░░░░ 80 BPM       │
│  ☑ Mostrar Dicas  ☐ Avançar Auto          │
│  ☑ Repetir Seções  ☑ Salvar Progresso     │
│                                             │
│  [💾 Salvar Alterações]                    │
└─────────────────────────────────────────────┘
```

---

## 📐 **Especificações de Design**

### **🎨 Color Palette**

```css
:root {
  --primary: #6366f1; /* Indigo */
  --primary-dark: #4f46e5;
  --secondary: #f97316; /* Orange */
  --success: #10b981; /* Emerald */
  --warning: #f59e0b; /* Amber */
  --danger: #ef4444; /* Red */
  --background: #ffffff;
  --surface: #f8fafc;
  --text: #1e293b;
  --text-muted: #64748b;
  --border: #e2e8f0;
}
```

### **📏 Layout Grid**

- **Container Max Width**: 1400px
- **Grid**: 12 colunas
- **Breakpoints**:
  - Mobile: 320px-768px
  - Tablet: 768px-1024px
  - Desktop: 1024px+
- **Spacing Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px

### **🔤 Typography**

- **Headings**: Inter 600-800
- **Body**: Inter 400-500
- **Code**: JetBrains Mono
- **Scale**: 12px, 14px, 16px, 18px, 20px, 24px, 32px, 48px

### **🎭 Components**

- **Buttons**: 8px border radius, hover animations
- **Cards**: 12px border radius, subtle shadows
- **Inputs**: Focus ring, consistent sizing
- **Progress Bars**: Animated, gradient fills

---

## 🔄 **User Flow Diagram**

```
START → Landing Page
         │
         ├─ Sign Up → Onboarding → Dashboard
         │
         └─ Sign In → Dashboard
                        │
                        ├─ Upload Audio → Transcription → Results → Practice
                        │
                        ├─ View Library → Select Song → Practice
                        │
                        ├─ View Progress → Analytics Dashboard
                        │
                        └─ Settings → Profile/Preferences
```

---

## 🏗️ **Architecture Overview**

```
Frontend (Next.js 15)
├─ Pages (App Router)
├─ Components (Radix UI)
├─ Hooks (Custom + SWR)
├─ Utils (Music + Audio)
└─ State (Zustand)
        │
        ▼ HTTP/WebSocket
Backend (API Routes)
├─ Auth (NextAuth.js)
├─ Database (Prisma)
├─ AI Engine (Magenta)
├─ File Storage (Vercel Blob)
└─ External APIs (Stripe, Google)
        │
        ▼ PostgreSQL
Database Schema
├─ Users & Auth
├─ Songs & Versions
├─ Practice Sessions
├─ Progress Tracking
└─ Achievements
```

---

## 📱 **Responsive Behavior**

### **Mobile (320px-768px)**

- Sidebar collapses to hamburger menu
- Single column layout
- Touch-optimized controls
- Simplified practice interface

### **Tablet (768px-1024px)**

- 2-column grid layouts
- Collapsible sidebar
- Medium-sized components
- Landscape optimizations

### **Desktop (1024px+)**

- Full sidebar navigation
- 3+ column layouts
- Hover states active
- Keyboard shortcuts enabled

---

## 🎬 **Animation Specifications**

### **Transitions**

- **Duration**: 150ms (fast), 300ms (normal), 500ms (slow)
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Elements**: hover, focus, page transitions

### **Loading States**

- Skeleton screens for content
- Spinner for actions
- Progress bars for uploads
- Pulse animations for placeholders

### **Micro-interactions**

- Button press feedback
- Form field focus rings
- Success/error state changes
- Menu open/close animations

---

Esta documentação serve como referência completa para desenvolvedores e designers implementarem as interfaces exactly como especificado. Cada elemento tem suas dimensões, cores e comportamentos definidos para garantir consistência em todo o produto.

As "imagens" são na verdade especificações detalhadas em ASCII art e texto que mostram exatamente como cada interface deve ser estruturada e implementada!
