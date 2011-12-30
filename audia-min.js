var Audia=function(){var g=!0;if(typeof AudioContext=="function")var d=new AudioContext;else typeof webkitAudioContext=="function"?d=new webkitAudioContext:g=!1;var i=function(b,a,d){if(b<a)return a;else if(b>d)return d;return b},h={},c={},j=0,a=function(b){this._id=++j;this._duration=this._currentTime=0;this._onendedTimeout=this._gain=null;this._playing=this._muted=!1;this._startTime=this._source=null;this._volume=1;if(typeof b=="string")this.src=b;else if(typeof b=="object")for(var a in b)this[a]=
b[a];c[this._id]=this};a.__defineGetter__("version",function(){return 0.1});a.__defineGetter__("supported",function(){return g});if(!g)return a;a.muteAll=function(){for(var b in c)c[b].mute()};a.unmuteAll=function(){for(var b in c)c[b].unmute()};a.prototype.__defineGetter__("currentTime",function(){if(this._playing){var b=d.currentTime-this._startTime+this._currentTime;return b>this._duration?this._duration:b}else return this._currentTime});a.prototype.__defineSetter__("currentTime",function(b){b=
i(b,0,this._duration);if(this.currentTime!=b){var a=this._playing;this._stop();this._currentTime=b;a&&this.play()}});a.prototype.__defineGetter__("duration",function(){return this._duration});a.prototype.__defineGetter__("muted",function(){return this._muted});a.prototype.__defineSetter__("muted",function(b){b?this.mute():this.unmute()});a.prototype.__defineGetter__("playing",function(){return this._playing});a.prototype.__defineGetter__("src",function(){return this._src});a.prototype.__defineSetter__("src",
function(b){this._src=b;var a=this,c=d.createGainNode();c.connect(d.destination);c.gain.value=this._muted?0:this._volume;var f=d.createBufferSource();f.connect(c);this._gain=c;this._source=f;if(b in h)f.buffer=h[b];else{var e=new XMLHttpRequest;e.open("GET",b,!0);e.responseType="arraybuffer";e.onload=function(){var c=d.createBuffer(e.response,!1);f.buffer=c;h[b]=c;a._duration=c.duration;a.onload()};e.send()}});a.prototype.__defineGetter__("volume",function(){return this._volume});a.prototype.__defineSetter__("volume",
function(b){this._volume=b=i(b,0,10);if(!this._muted)this._gain.gain.value=b});a.prototype.onended=function(){};a.prototype.onload=function(){};a.prototype.play=function(b){if(b!==void 0)this.currentTime=b;if(!this._playing){this._regenerateBuffer();b=this._duration-this._currentTime-0.01;this._source.noteGrainOn(0,this._currentTime,b);this._playing=!0;this._startTime=d.currentTime;var a=this;this._onendedTimeout=setTimeout(function(){a.onended();a._stop();a.currentTime=0;a.loop&&a.play()},b*1E3)}};
a.prototype.pause=function(){this._stop()};a.prototype.stop=function(){this._stop();this._currentTime=0};a.prototype._stop=function(){if(this._playing){if(this._onendedTimeout)clearTimeout(this._onendedTimeout),this._onendedTimeout=null;this._source.noteOff(0);this._expireBuffer();this._currentTime+=d.currentTime-this._startTime;this._playing=!1}};a.prototype._expireBuffer=function(){this._source=null};a.prototype.mute=function(){this._muted=!0;if(this._gain)this._gain.gain.value=0};a.prototype.unmute=
function(){this._muted=!1;if(this._gain)this._gain.gain.value=this._volume};a.prototype._regenerateBuffer=function(){this.src=this._src};return a}();
