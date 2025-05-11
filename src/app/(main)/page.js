"use client";
import LandingPage from "@/components/pages/LandingPage";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
    return (
        <main className="w-full min-h-screen ">
            <DotPattern className={cn("h-screen [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]")} />
            <LandingPage />
        </main>
    );
}
