# StudentStack

A premium developer dashboard for students to discover, track, and save hackathons, developer packs, and live internships.

![StudentStack Dashboard](/public/dashboard.png)

## Live Deployment
🚀 **[student-stack.vercel.app](https://student-stack.vercel.app)**

## Tech Stack
- **Framework:** Next.js `13.5.1` (App Router)
- **Language:** TypeScript `5.2.2`
- **Styling:** Tailwind CSS `3.3.3`
- **Icons:** Lucide React

## Data Sourcing & Architecture
StudentStack implements a robust hybrid data acquisition pipeline to balance dynamic scraping and reliable uptime:
- **Internships:** Parsed in real-time from the popular community-maintained [SimplifyJobs/Summer2026-Internships](https://github.com/SimplifyJobs/Summer2026-Internships) repository README markdown tables.
- **Hackathons:** Sourced from a curated database of top hackathons (Google Summer of Code, Smart India Hackathon, MLH, HackMIT), loaded from a remote GitHub raw JSON feed with a local offline failover database.
- **Student Packs:** Manually-curated database of the top student developer benefits (GitHub Student Pack, JetBrains IDEs, Notion Education, Figma Education), loaded from a remote raw JSON feed with local JSON backups.

All external calls are protected by a global **15-minute server-side TTL caching layer** and **5-second fetch timeouts** to mitigate network latency and prevent GitHub API rate-limiting.

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/SumedhSA3021/Student_Stack.git
cd Student_Stack
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env.local` file in the root directory:
```env
# Optional: Override remote JSON data endpoints
NEXT_PUBLIC_HACKATHON_DATA_URL=https://raw.githubusercontent.com/SumedhSA3021/Student_Stack/main/data/hackathons.json
NEXT_PUBLIC_STUDENT_PACKS_URL=https://raw.githubusercontent.com/SumedhSA3021/Student_Stack/main/data/student_packs.json
NEXT_PUBLIC_INTERNSHIP_DATA_URL=https://raw.githubusercontent.com/SimplifyJobs/Summer2026-Internships/dev/README.md
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
