/**
 * Copyright (c) 2014,www.easyegret.com
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EASYEGRET.COM AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
module easy {
    export class BaseEffect implements IEffect{
        public _outerTarget:ReceiveGroup = null;
        public _enterTarget:ReceiveGroup = null;
        public constructor() {
            super();
        }

        /**
         * 准备数据,播放效果
         */
        public play():void {
            this._enterTarget = ViewManager._waitChangeView;
            this._outerTarget = ViewManager.currentView;
            if (this._enterTarget == this._outerTarget)this._outerTarget = null;
            this.onPlayEffect();
        }

        public onPlayEffect():void {
            if (this._outerTarget)this._outerTarget.outerTransition();
            if (this._enterTarget)this._enterTarget.enterTransition();
        }
        public onEffectComplete():void {
            if (this._outerTarget)this._outerTarget.outerTransitionComplete();
            if (this._enterTarget)this._enterTarget.enterTransitionComplete();
            this._outerTarget = null;
            this._enterTarget = null;
        }
    }
}