module.exports = [
"[project]/Desktop/Project/NovaSOC/frontend/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Project/NovaSOC/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Project/NovaSOC/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Project/NovaSOC/frontend/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Project/NovaSOC/frontend/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
function Home() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        /* =============================
       HERO TITLE ANIMATION
    ============================== */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].from(".hero-title", {
            opacity: 0,
            y: -40,
            duration: 1.4,
            ease: "power3.out"
        });
        /* =============================
       SUBTEXT ANIMATION
    ============================== */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].from(".hero-subtext", {
            opacity: 0,
            y: 25,
            delay: 0.4,
            duration: 1.2,
            ease: "power3.out"
        });
        /* =============================
       FEATURE BOX ANIMATION (FIXED)
    ============================== */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(".feature-box", {
            opacity: 0,
            y: 80
        }, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.25,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
                trigger: "#features",
                start: "top 80%",
                once: true
            }
        });
        /* =============================
       BACKGROUND PARALLAX
    ============================== */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".hero-bg", {
            y: 120,
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                scrub: 1
            }
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "relative min-h-screen bg-black text-white overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hero-bg"
            }, void 0, false, {
                fileName: "[project]/Desktop/Project/NovaSOC/frontend/app/page.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative z-10 min-h-screen flex flex-col items-center justify-start pt-6 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "hero-title typing-title text-7xl font-extrabold text-cyan-400 mb-10",
                        children: "Welcome to NovaSOC"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Project/NovaSOC/frontend/app/page.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hero-subtext text-2xl text-gray-300 max-w-3xl",
                        children: [
                            "AI-powered Cyber Defense with Real-Time Cloud Monitoring,",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/Desktop/Project/NovaSOC/frontend/app/page.tsx",
                                lineNumber: 81,
                                columnNumber: 68
                            }, this),
                            "Threat Detection & Automated Incident Response."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Project/NovaSOC/frontend/app/page.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Project/NovaSOC/frontend/app/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "features",
                className: "relative z-10 py-20 bg-black/80 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-6xl font-bold mb-12",
                        children: "Why NovaSOC?"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Project/NovaSOC/frontend/app/page.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-20 max-w-6xl mx-auto",
                        children: [
                            "Threat Detection",
                            "Cloud Security",
                            "Log Monitoring",
                            "Incident Response",
                            "Automation & Alerts",
                            "User Behavior Analytics"
                        ].map((feature, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2f$NovaSOC$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "feature-box p-8 bg-gray-900/70 border border-cyan-400 rounded-xl text-xl  hover:scale-105 hover:shadow-[0_0_25px_#00eaff] transition",
                                children: feature
                            }, i, false, {
                                fileName: "[project]/Desktop/Project/NovaSOC/frontend/app/page.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Project/NovaSOC/frontend/app/page.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Project/NovaSOC/frontend/app/page.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Project/NovaSOC/frontend/app/page.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_Project_NovaSOC_frontend_app_page_tsx_2712f09e._.js.map