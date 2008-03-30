/**
 * Component rendering peer: Composite
 */
EchoAppRender.CompositeSync = Core.extend(EchoRender.ComponentSync, {

    $load: function() {
        EchoRender.registerPeer("Composite", this);
    },

    $virtual: {
        renderStyle: function(element) {
            EchoAppRender.Color.renderFB(this.component, element);
            EchoAppRender.Font.render(this.component.render("font"), element);
        }
    },
    
    renderAdd: function(update, parentElement) {
        this._div = document.createElement("div");
        this._div.id = this.component.renderId;
        
        var componentCount = this.component.getComponentCount();
        if (componentCount > 0) {
            this.renderStyle(this._div);
            for (var i = 0; i < componentCount; ++i) {
                var child = this.component.getComponent(i);
                EchoRender.renderComponentAdd(update, child, this._div);
            }
        }
        
        parentElement.appendChild(this._div);
    },
    
    renderDispose: function(update) { 
        this._div = null;
    },
    
    renderUpdate: function(update) {
        var element = this._div;
        var containerElement = element.parentNode;
        EchoRender.renderComponentDispose(update, update.parent);
        containerElement.removeChild(element);
        this.renderAdd(update, containerElement);
        return true;
    }
});

EchoRender.ComponentSync.Panel = Core.extend(EchoAppRender.CompositeSync, {
    $load: function() {
        EchoRender.registerPeer("Panel", this);
    },

    renderStyle: function(element) {
        EchoAppRender.CompositeSync.prototype.renderStyle.call(this, element);
        EchoAppRender.Border.render(this.component.render("border"), element);
        EchoAppRender.Insets.render(this.component.render("insets"), element, "padding");
    }
});
