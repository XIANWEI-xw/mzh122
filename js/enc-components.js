/* =============================================
   Encounter · High-End Moment Ticket Engine
   ============================================= */

(function injectMomentStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        .wc-moment-wrapper {
            perspective: 1500px;
            margin: 25px 0;
            display: flex;
            justify-content: center;
            width: 100%;
            animation: momentPopIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        @keyframes momentPopIn {
            from { opacity: 0; transform: translateY(20px) rotateX(10deg); }
            to { opacity: 1; transform: translateY(0) rotateX(0); }
        }

        .enc-tactile-ticket {
            width: 180px;
            background: #fcfcfc;
            padding: 35px 20px;
            position: relative;
            transform: rotateZ(-5deg) rotateY(15deg) rotateX(10deg);
            box-shadow: 
                -1px 1px 0px #e0e0e0,
                -15px 25px 45px rgba(0,0,0,0.1),
                -5px 10px 15px rgba(0,0,0,0.05);
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .enc-tactile-ticket:hover {
            transform: rotateZ(-1deg) rotateY(5deg) rotateX(2deg);
        }

        .enc-ticket-texture {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none;
            z-index: 10;
            opacity: 0.45;
            mix-blend-mode: multiply;
        }

        .enc-ticket-edge {
            position: absolute;
            left: 0; width: 100%; height: 12px;
            fill: #fcfcfc;
            z-index: 11;
        }
        .enc-t-edge-top { top: -11px; }
        .enc-t-edge-bottom { bottom: -11px; transform: rotate(180deg); }

        .enc-ticket-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 25px;
            border-bottom: 0.5px solid rgba(0,0,0,0.05);
            padding-bottom: 15px;
        }

        .enc-ticket-brand {
            font-family: "Space Mono", monospace;
            font-size: 7px;
            letter-spacing: 5px;
            text-transform: uppercase;
            font-weight: 900;
            color: #111;
        }

        .enc-ticket-body {
            font-family: "Georgia", serif;
            font-style: italic;
            font-size: 14px;
            line-height: 1.8;
            color: #111;
            text-align: center;
            margin: 20px 0;
            letter-spacing: 0.3px;
        }

        .enc-ticket-footer {
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            opacity: 0.8;
        }

        .enc-ticket-barcode {
            width: 100px;
            height: 14px;
            margin-bottom: 10px;
        }

        .enc-ticket-meta {
            font-family: "Space Mono", monospace;
            font-size: 7px;
            color: #aaa;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
    `;
    document.head.appendChild(style);
})();

function renderMomentTicket(content) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();

    return `
    <div class="wc-moment-wrapper">
        <div class="enc-tactile-ticket">
            <svg class="enc-ticket-texture">
                <filter id='paper-grain-ticket'>
                    <feTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='noise'/>
                    <feDiffuseLighting in='noise' lighting-color='#ffffff' surfaceScale='2'>
                        <feDistantLight azimuth='45' elevation='60'/>
                    </feDiffuseLighting>
                </filter>
                <rect width='100%' height='100%' filter='url(#paper-grain-ticket)' />
            </svg>

            <svg class="enc-ticket-edge enc-t-edge-top" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0 12 L3 4 L6 10 L10 2 L14 11 L18 5 L22 12 L27 3 L31 10 L35 1 L40 12 L45 4 L50 10 L55 2 L60 11 L65 5 L70 12 L76 3 L82 10 L88 2 L94 11 L100 12 Z" />
            </svg>

            <div class="enc-ticket-header">
                <svg width="24" height="24" viewBox="0 0 40 40" style="margin-bottom:8px;">
                    <rect x="10" y="10" width="20" height="20" fill="none" stroke="black" stroke-width="0.8"/>
                    <circle cx="20" cy="20" r="14" fill="none" stroke="black" stroke-width="0.5" stroke-dasharray="1,2"/>
                </svg>
                <div class="enc-ticket-brand">Moment Archive</div>
            </div>

            <div class="enc-ticket-body">
                “ ${content} ”
            </div>

            <div class="enc-ticket-footer">
                <svg class="enc-ticket-barcode" viewBox="0 0 100 15">
                    <rect x="0" width="2" height="15"/><rect x="5" width="1" height="15"/><rect x="10" width="4" height="15"/>
                    <rect x="18" width="1" height="15"/><rect x="25" width="2" height="15"/><rect x="35" width="5" height="15"/>
                    <rect x="45" width="1" height="15"/><rect x="55" width="2" height="15"/><rect x="65" width="1" height="15"/>
                    <rect x="75" width="4" height="15"/><rect x="85" width="2" height="15"/><rect x="95" width="1" height="15"/>
                </svg>
                <div class="enc-ticket-meta">${dateStr} // ${timeStr}</div>
                <div class="enc-ticket-meta">SYS.MEMO-8829</div>
            </div>

            <svg class="enc-ticket-edge enc-t-edge-bottom" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0 12 L3 4 L6 10 L10 2 L14 11 L18 5 L22 12 L27 3 L31 10 L35 1 L40 12 L45 4 L50 10 L55 2 L60 11 L65 5 L70 12 L76 3 L82 10 L88 2 L94 11 L100 12 Z" />
            </svg>
        </div>
    </div>`;
}
