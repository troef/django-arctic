( function ( $ ) {
    'use strict'

    function AppendTemplate ( element ) {
        this.element = $( '[data-append-template]' )
        this.template = this.element.data( 'append-template' )
        this.button = '<a class="button">Add</a>'

        // define template
        if ( this.template ) {
            this.template = this.element.find( this.template )
        }

        // init
        if ( this.template != undefined && this.template.size() ) {
            this.template = this.template.clone()

            var self = this

            // window.self = self;
            self.setup()
            self.init()
        }
    }

    AppendTemplate.prototype.setup = function ( ) {
        var self = this

        // disable selectize when in template
        self.template.find("select").each(function(){
            $(this)[0].selectize.destroy();

            if ( this.selectize ) {
                this.selectize.destroy();
            }
        });

        // append add button
        self.element.after( self.button )
        self.button = self.element.next()
    }

    AppendTemplate.prototype.init = function ( ) {
        var self = this

        self.button.on( 'click', function () {

            self.element.append( self.template.clone() )
            selectize()
            self.element.trigger( 'recalc' );
        })
    }

    $(document).ready(function() {
        new AppendTemplate()
    })

} )( jQuery )