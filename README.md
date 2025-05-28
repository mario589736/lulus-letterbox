# Lulu's Letterbox 💌

**Personalisierte Postkarten für das Toilettentraining**

Eine moderne Web-Anwendung für den deutschen und österreichischen Markt, die Eltern dabei unterstützt, ihre Kinder beim Toilettentraining zu motivieren - mit personalisierten Postkarten von Lulu und Kacka!

## 🎯 Funktionen

### User Stories umgesetzt:

#### 1. **Registrierung und Kinderprofil**
- ✅ Einfache E-Mail-Registrierung
- ✅ Kinderprofil mit Name, Geburtsdatum, Geschlecht
- ✅ Personalisierung mit Lieblingsfarbe und -motiv
- ✅ Bearbeitbare Profile vor der ersten Bestellung

#### 2. **Meilenstein-Auswahl und Versandrhythmus**
- ✅ Vordefinierte Toiletten-Meilensteine
- ✅ Kategorisierung: Grundlagen, Fortgeschritten, Besondere Erfolge
- ✅ Flexibler Versandrhythmus (wöchentlich, bei Meilenstein, individuell)
- ✅ Vorschau-Kalender für geplante Sendungen

#### 3. **Postkarteninhalt und Story-Episoden**
- ✅ Interaktive Postkarten-Vorschau
- ✅ Personalisierte Nachrichten mit Lulu & Kacka
- ✅ Illustration-Preview mit Kindname und Thema
- ✅ Freigabe-System mit Feedback-Möglichkeit
- ✅ E-Mail-Bestätigung nach Freigabe

#### 4. **Postkartenempfang und Fortschritts-Dashboard**
- ✅ Push-Benachrichtigungen bei Versand
- ✅ Sendungsverfolgung mit Zustelldatum
- ✅ Eltern-Dashboard mit Fortschrittsübersicht
- ✅ Reaktions-Tracking für jede zugestellte Karte
- ✅ Visuelle Timeline der Meilensteine

## 🚀 Technischer Stack

- **Frontend:** Next.js 14 mit TypeScript
- **Styling:** Tailwind CSS mit deutscher Farbpalette
- **Rendering:** Hybrid (SSG + SSR)
- **SEO:** Optimiert für deutsche Suchmaschinen
- **Fonts:** Inter & Fira Code via Google Fonts
- **Bilder:** Next.js Image Optimization

## 📱 Seiten und Komponenten

### Hauptseiten:
- **Dashboard** (`/`) - Übersicht des Kinderfortschritts
- **Kinderprofil** (`/profile/[id]`) - Detaillierte Profilansicht
- **Postkarten-Vorschau** (`/postcard/[id]`) - Einzelne Postkarten

### Komponenten:
- **DashboardHeader** - Kinderspezifische Navigation
- **StatsOverview** - Postkartenstatistiken
- **MilestoneProgress** - Fortschrittsanzeige
- **PostcardTimeline** - Aktivitätsverlauf
- **SEOHead** - Deutsche SEO-Optimierung

## 🎨 Design-System

### Farbpalette:
- **Primary:** Pink-Töne für weibliche Zielgruppe
- **Secondary:** Lila-Töne für Akzente
- **Accent:** Gelb für Erfolgs-Highlights
- **Grau-Töne:** Für Text und UI-Elemente

### Typography:
- **Inter:** Hauptschrift für optimale Lesbarkeit
- **Fira Code:** Monospace für technische Elemente

## 🌍 Lokalisierung

- **Sprache:** Vollständig auf Deutsch
- **Locale:** de-DE (Deutschland) / de-AT (Österreich)
- **Datumsformat:** DD.MM.YYYY (europäisch)
- **SEO:** Deutsche Keywords und Meta-Tags

## 📊 Meilensteine

### Grundlagen:
1. 🚽 Erstes Mal ohne Windel
2. 🌟 3 Tage hintereinander trocken

### Fortgeschritten:
3. 🌙 Kein nächtliches Malheur (1 Woche)
4. 🏆 Selbstständig zur Toilette

### Besondere Erfolge:
5. 💩 Große Geschäfte gemeistert

## 🎭 Charaktere

- **Lulu:** Hauptcharakter, motivierend und liebevoll
- **Kacka:** Lustiger Sidekick, macht das Thema spielerisch

## 💌 Personalisierung

- Name des Kindes in jeder Nachricht
- Geschlechtsspezifische Illustrationen
- Themenbasierte Gestaltung (Prinzessin, Dinosaurier, etc.)
- Farbanpassung nach Vorlieben

## 🚀 Installation & Start

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build
npm run build
npm start

# Sitemap generieren
npm run postbuild
```

## 📱 Live-Demo

Öffnen Sie [http://localhost:3000](http://localhost:3000) um die Anwendung zu sehen.

## 🔧 Konfiguration

- **next.config.ts:** Bilddomains und Server-Konfiguration
- **tailwind.config.js:** Deutsche Farben und Fonts
- **next-sitemap.config.js:** SEO-Sitemap für Suchmaschinen

## 📈 Performance

- **SSG:** Statische Generierung für das Dashboard
- **SSR:** Server-Side Rendering für Profile
- **ISR:** Incremental Static Regeneration (1 Stunde)
- **Image Optimization:** Automatische Bildkomprimierung

## 🎯 Zielgruppe

- **Primär:** Mütter und Väter in Deutschland und Österreich
- **Alter der Kinder:** 18 Monate - 4 Jahre
- **Fokus:** Toilettentraining-Phase

---

**Erstellt mit ❤️ für deutsche Familien**

*Lulu's Letterbox macht das Toilettentraining zu einem besonderen Abenteuer für Ihr Kind!*
