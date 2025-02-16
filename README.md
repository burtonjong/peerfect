# Peerfect

[![built with nix](https://builtwithnix.org/badge.svg)](https://builtwithnix.org)

Peerfect was built for **CalgaryHacks 25** to address the challenge of "creating a solution for people that are new to independence." Many people who start living on their own lack essential life skills, but there are always others who have the knowledge they need - and vice versa. **Peerfect** connects individuals based on their skills, enabling them to help each other navigate independence.

## Features

- **Skill Matching** – Find people who have the skills you need or offer your own expertise.
- **Post & Browse Requests** – Users can create posts requesting help or offering guidance.
- **Messaging System** – Directly connect with people to share knowledge.
- **User Profiles** – Display your skills and track your contributions.
- **Authentication** – Secure sign-in and user management with Supabase.
- **Responsive UI** – Designed with Tailwind CSS and Shadcn UI for an intuitive experience.

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/)
- **Backend & Database:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State Management:** React Hooks
- **Deployment:** Vercel (Optional)
- **Development Environment:** Nix

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Nix](https://nixos.org/) for development shell (optional but recommended)
- A Supabase project (sign up at [supabase.com](https://supabase.com/))
- [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=platform&platform=windows&queryGroups=access-method&access-method=studio) installed

### Running the Project Locally

1. Clone the repository:

   ```sh
   git clone https://github.com/burtonjong/peerfect.git
   cd peerfect
   ```

2. Install dependencies:

   ```sh
   nix develop  # If using Nix (you rock!)
   npm install  # Otherwise, just install dependencies
   ```

3. Start Supabase locally:

   ```sh
   supabase start
   ```

4. Set up environment variables:

   - The output of `supabase start` will show your local Supabase URL and anon key.
   - Copy `.env.example` to `.env.local`
   - Fill in your **Supabase** credentials:

   ```sh
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

5. Run database migrations:

   ```sh
   supabase db push
   ```

6. Start the development server:

   ```sh
   npm run dev
   ```

   The app will be available at `http://localhost:3000/`.

## Usage

1. **Sign Up & Create a Profile** – Add your skills and the skills you’re looking for.
2. **Browse Requests & Offers** – View and respond to posts from others.
3. **Start a Conversation** – Message users directly to offer or request help.
4. **Grow & Contribute** – Earn reputation by helping others and gain new skills.
