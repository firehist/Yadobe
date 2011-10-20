JS.State=new JS.Module('State',{
    __getState__:function(a){
        if(typeof a==='object')return a;
        if(typeof a==='string')return(this.states||{})[a];
        return{}
    },
    getState:function(){
        for (var a in this.states) {
            if(this.__state__===this.__getState__(this.states[a]))
                return a;
        }
        return "";
    },
    setState:function(a){
        this.__state__=this.__getState__(a);
        JS.State.addMethods(this.__state__,this.klass)
    },
    inState:function(){
        var a=arguments.length;
        while(a--){
            if(this.__state__===this.__getState__(arguments[a]))
                return true;
        }
        return false;
    },
    extend:{
        ClassMethods:new JS.Module({
            states:function(a){
                this.define('states',JS.State.buildCollection(this,a));
            }
        }),
        included:function(a){
            a.extend(this.ClassMethods);
        },
        stub:function(){
            return this;
        },
        buildStubs:function(a,c,d){
            var b,e;
            for(b in d){
                c[b]={};
                for(e in d[b])
                    a[e]=this.stub;
            }
        },
        findStates:function(a,c){
            var d=a.length,b=[];
            while(d--){
                if(a[d].hasOwnProperty(c))
                    b.push(a[d][c]);
            }
            return b;
        },
        buildCollection:function(a,c){
            var d={},b={},e=a.lookup('states'),h,g,k,i,j,f,l;
            this.buildStubs(d,b,c);
            for(f=0,l=e.length;f<l;f++)
                this.buildStubs(d,b,e[f]);
            for(h in b){
                g=new JS.Class(c[h]);
                j=this.findStates(e,h);
                f=j.length;
                while(f--){
                    if(j[f])
                        g.include(j[f].klass);
                }
                k={};
                for(i in d){
                    if(!g.prototype[i])
                        k[i]=d[i];
                }
                g.include(k);
                b[h]=new g;
            }
            if(a.__tgt__)
                this.addMethods(d,a.__tgt__.klass);
            return b
        },
        addMethods:function(a,c){
            if(!c)return;
            var d={},b=c.prototype,e;
            for(e in a){
                if(b[e])continue;
                c.define(e,this.wrapped(e))
            }
        },
        wrapped:function(c){
            return function(){
                var a=(this.__state__||{})[c];
                return a?a.apply(this,arguments):this
            }
        }
    }
});
