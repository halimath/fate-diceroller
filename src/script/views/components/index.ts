import * as wecco from "@weccoframework/core"

export function appShell(content: wecco.ElementUpdate, additionalAppBarContent?: wecco.ElementUpdate): wecco.ElementUpdate {
    return wecco.html`
        <div class="flex flex-col min-h-screen">
            <header class="sticky top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto mb-2 bg-white flex-none flex bg-blue-900">
                <div class="flex-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8 text-white font-bold text-lg">
                    <div>Fate Core Diceroller</div>
                    ${additionalAppBarContent ?? ""}
                </div>
            </header>
            <main class="flex-grow">
                ${content}
            </main>
            <footer class="bg-blue-200 h-16 text-gray-600 text-xs flex items-center justify-around px-2">
                <span>
                    Fate Core Diceroller v0.1.0.<br>
                    &copy; 2021 Alexander Metzner.
                </span>
                <span>
                    <a href="https://github.com/halimath/fate-diceroller">github.com/halimath/fate-diceroller</a>
                </span>
            </footer>
        </div>
        `
}

export function container(content: wecco.ElementUpdate): wecco.ElementUpdate {
    return wecco.html`<div class="container lg:mx-auto lg:px-4">${content}</div>`
}

export type ButtonStyle = "primary" | "secondary"
export type ButtonCallback = () => void

export function button(content: wecco.ElementUpdate, onClick: ButtonCallback, style: ButtonStyle = "primary"): wecco.ElementUpdate {
    const col = color(style)
    return wecco.html`<button @click=${onClick} class="bg-${col}-500 hover:bg-${col}-700 text-white font-bold py-2 px-4 rounded">${content}</button>`
}

function color(style: ButtonStyle): string {
    switch (style) {
        case "primary":
            return "blue"
        case "secondary":
            return "yellow"
    }
}
