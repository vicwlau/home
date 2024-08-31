//https://playground.p5aholic.me/variable-font-experiment-01/
//amazing font changing effect

( () => {
    "use strict";
    let t = null;
    class i {
        constructor() {
            if (t)
                return t;
            this.updateFunctions = [],
            this.updateFunctionsLength = 0,
            t = this,
            this.init()
        }
        static getInstance() {
            return t || (t = new i),
            t
        }
        static add(t) {
            i.getInstance().add(t)
        }
        static remove(t) {
            i.getInstance().remove(t)
        }
        static reset() {
            i.getInstance().reset()
        }
        init() {
            this.animFunction = this.update.bind(this),
            requestAnimationFrame(this.animFunction)
        }
        add(t) {
            this.updateFunctions.push(t),
            this.updateFunctionsLength = this.updateFunctions.length
        }
        remove(t) {
            let i;
            for (let e = 0; e < this.updateFunctionsLength; e++)
                if (i = this.updateFunctions[e],
                i === t) {
                    this.updateFunctions.splice(e, 1);
                    break
                }
            this.updateFunctionsLength = this.updateFunctions.length
        }
        update(t) {
            let i;
            requestAnimationFrame(this.animFunction);
            for (let e = 0; e < this.updateFunctionsLength; e++)
                i = this.updateFunctions[e],
                i(t)
        }
        reset() {
            for (let t = 0; t < this.updateFunctionsLength; t++)
                delete this.updateFunctions[t];
            this.updateFunctions = [],
            this.updateFunctions.length = 0,
            this.updateFunctionsLength = 0
        }
    }
    class e {
        constructor() {
            this.prevSize = {
                w: 0,
                h: 0
            },
            this.checkTime = 0,
            this.interval = 500
        }
        check() {
            let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            const i = performance.now();
            return !(i - this.checkTime < this.interval || (this.checkTime = i,
            !t && (window.innerWidth === this.prevSize.w && window.innerHeight === this.prevSize.h || (this.prevSize.w = window.innerWidth,
            this.prevSize.h = window.innerHeight,
            0))))
        }
    }
    let s = null;
    class n {
        constructor() {
            if (s)
                return s;
            this.px = 0,
            this.py = 0,
            this.isTouch = "ontouchstart"in document,
            s = this,
            this.init()
        }
        static getInstance() {
            return s || (s = new n),
            s
        }
        static get x() {
            return n.getInstance().px
        }
        static get y() {
            return n.getInstance().py
        }
        init() {
            window.addEventListener(this.isTouch ? "touchmove" : "pointermove", this.onPointerMove.bind(this), {
                capture: !0,
                passive: !1
            })
        }
        onPointerMove(t) {
            t.preventDefault(),
            this.px = this.getMoveX(t),
            this.py = this.getMoveY(t)
        }
        getMoveX(t) {
            return this.isTouch ? t.changedTouches[0].pageX : t.pageX
        }
        getMoveY(t) {
            return this.isTouch ? t.changedTouches[0].pageY : t.pageY
        }
    }
    class h {
        static random(t, i) {
            return void 0 === t ? Math.random() : void 0 === i ? Math.random() * t : t + Math.random() * (i - t)
        }
        static randomInt(t, i) {
            return Math.floor(h.random(t, i))
        }
        static constrain(t, i, e) {
            return Math.max(Math.min(t, e), i)
        }
        static map(t, i, e, s, n) {
            return (t - i) / (e - i) * (n - s) + s
        }
        static radians(t) {
            return t * (2 * Math.PI / 360)
        }
        static length(t, i) {
            return Math.sqrt(t * t + i * i)
        }
        static dist(t, i, e, s) {
            return Math.sqrt((t - e) * (t - e) + (i - s) * (i - s))
        }
        static lerp(t, i, e) {
            return t + (i - t) * e
        }
        static calcViewportFov(t, i) {
            return 2 * Math.atan(t / i) * (180 / Math.PI)
        }
    }
    class a {
        constructor(t, i) {
            this.position = t,
            this.velocity = t,
            this.alphaSpeed = i
        }
        lerp(t, i, e) {
            return t + (i - t) * e
        }
        step(t, i) {
            const e = Math.exp(-this.alphaSpeed * i)
              , s = this.lerp(t, this.position, e);
            this.velocity = s - this.position,
            this.position = s
        }
        reset() {
            this.position = 0,
            this.velocity = 0
        }
    }
    class o {
        constructor(t, i) {
            this.position = {
                x: t.x,
                y: t.y
            },
            this.velocity = {
                x: 0,
                y: 0
            },
            this.alphaSpeed = i,
            this.direction = 0
        }
        lerp(t, i, e) {
            return t + (i - t) * e
        }
        step(t, i) {
            const e = Math.exp(-this.alphaSpeed * i)
              , s = this.lerp(t.x, this.position.x, e)
              , n = this.lerp(t.y, this.position.y, e);
            this.velocity.x = s - this.position.x,
            this.velocity.y = n - this.position.y,
            this.position.x = s,
            this.position.y = n
        }
        calcDirection(t) {
            this.direction = Math.atan2(this.position.y - t.y, this.position.x - t.x)
        }
        reset() {
            this.position.x = 0,
            this.position.y = 0,
            this.velocity.x = 0,
            this.velocity.y = 0,
            this.direction = 0
        }
        get x() {
            return this.position.x
        }
        get y() {
            return this.position.y
        }
    }
    class r {
        constructor() {
            this.$container = document.getElementById("CanvasContainer"),
            this.$canvas = this.$container.querySelector("canvas"),
            this.ctx = this.$canvas.getContext("2d"),
            this.dpr = Math.min(window.devicePixelRatio, 2),
            this.lastUpdateTime = 0,
            this.isReady = !1,
            this.prev = {
                x: 0,
                y: 0
            },
            this.angle = 0,
            this.pTween = new o({
                x: 0,
                y: 0
            },30),
            this.aTween = new a(0,10),
            this.resizeChecker = new e,
            this.init()
        }
        async init() {
            const t = new FontFace("Chillax","url(./font/Chillax-Variable.ttf)")
              , e = [t.load()];
            await Promise.all(e),
            document.fonts.add(t),
            this.resize(),
            i.add(this.update.bind(this))
        }
        resize() {
            const {width: t, height: i} = this.$container.getBoundingClientRect();
            this.$canvas.width = t * this.dpr,
            this.$canvas.height = i * this.dpr,
            this.$canvas.style.width = t + "px",
            this.$canvas.style.height = i + "px"
        }
        update(t) {
            const i = .001 * (t - this.lastUpdateTime);
            this.lastUpdateTime = t;
            const e = n.x * this.dpr
              , s = n.y * this.dpr;
            if (!this.isReady) {
                if (0 === e || 0 === s)
                    return;
                this.pTween.position.x = e,
                this.pTween.position.y = s,
                this.isReady = !0
            }
            const a = e - this.prev.x
              , o = s - this.prev.y;
            0 === a && 0 === o || (this.angle = Math.atan2(o, a)),
            this.pTween.step({
                x: e,
                y: s
            }, i),
            this.aTween.step(this.angle, i);
            const r = h.length(this.pTween.velocity.x, this.pTween.velocity.y)
              , c = Math.max(r * this.dpr, 10 * this.dpr)
              , p = h.constrain(r * this.dpr * 2, 200, 700)
              , d = Math.ceil(.01 * p);
            this.$canvas.style.fontVariationSettings = `'wght' ${p}`,
            this.ctx.save(),
            this.ctx.translate(this.pTween.x, this.pTween.y),
            this.ctx.rotate(this.aTween.position),
            this.ctx.lineWidth = d,
            this.ctx.strokeStyle = "#fff",
            this.ctx.fillStyle = "#000",
            this.ctx.textAlign = "center",
            this.ctx.textBaseline = "middle",
            this.ctx.font = `${c}px 'Chillax'`;
            const u = String.fromCharCode(65 + h.randomInt(0, 26));
            this.ctx.strokeText(u, 0, 0),
            this.ctx.fillText(u, 0, 0),
            this.ctx.restore(),
            this.prev.x = e,
            this.prev.y = s
        }
    }
    document.addEventListener("DOMContentLoaded", ( () => {
        new r
    }
    ))
}
)();
