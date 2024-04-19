import { Brain, Bug, Circle, Earth, Feather, Ghost, GlassWater, Leaf, Moon, Mountain, Shield, Skull, Snowflake, Sparkles, Sword } from "lucide-react";

export default function checkTypeReturnIcon(type: string) {
    switch (type) {
        case 'Fire':
            return (
                <span className="flex flex-row items-center gap-2 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path  d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                        <path  d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                    </svg>
                </span>
            );
        case 'Water':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <GlassWater />
                    </svg>
                </span>
            );
        case 'Flying':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <Feather />
                    </svg>
                </span>
            );
        case 'Grass':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <Leaf />
                    </svg>
                </span>
            );
        case 'Poison':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <Skull />
                    </svg>
                </span>
            );
        case 'Bug':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <Bug />
                    </svg>
                </span>
            );
        case 'Normal':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <Circle />
                    </svg>
                </span>
            );
        case 'Electric':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                        </svg>
                    </svg>
                </span>
            );
        case 'Fighting':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <Sword />
                </span>
            );
        case 'Ice':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <Snowflake />
                </span>
            );
        case 'Ground':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <Earth />
                </span>
            );
        case 'Psychic':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <Brain />
                </span>
            );
        case 'Fairy':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <Sparkles />
                </span>
            );
        case 'Dark':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <Moon />
                </span>
            );
        case 'Steel':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <Shield />
                </span>
            );
        case 'Ghost':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <Ghost />
                </span>
            );
        case 'Rock':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    <Mountain />
                </span>
            );
        case 'Dragon':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    Dragon
                </span>
            );
        default:
            return <span className="flex flex-row items-center gap-2 p-2"> ? </span>;
    }
}