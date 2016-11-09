/*
    Required html data attributes:
    * data-sortable - initiates sortable
    * data-row - defines a row to sort

    Optional
    * data-handle - to specify a specific dragging handle
    * data-position - field to save position of row

    * data-delete-handle - delete button
    * data-delete-flag - field to check as delete

    deps: Sortable
    * https://github.com/RubaXa/Sortable

 */

( function ( $, SortableJS ) {

    'use strict'

    function Sortable( element ) {
        this.element = $( '[data-sortable]' );
        this.rowClass = "";
        this.row = "";
        this.sortHandle = "";
        this.sortPosition = "";
        this.deleteHandle = "";
        this.deleteFlag = "";

        if ( this.element.size() ) {
            this.sortPosition = this.element.data( 'position' );
            this.rowClass = this.element.data( 'row' );
            this.row = this.element.find( this.rowClass );

            // is there something to sort?
            if ( !this.row.size() ) {
                throw new Error( 'Sortable: data-to-sort not valid or empty' );
                return
            }

            // handles
            this.sortHandle = this.element.data( 'handle' );
            this.deleteHandle = this.row.find( this.element.data( 'delete-handle' ) );

            var self = this;
            self.init();
        }
    }


    Sortable.prototype.init = function ( ) {
        var self = this;

        // check if there's a delete button, if so listen to it
        if ( self.deleteHandle.size() ) {
            self.deleteHandle.on( 'click', function ( event ) {
                self.remove( this, self );
            });
        }

        // initiate sortable list
        self.sorting();

        // listen to manual recalc event
        self.element.on( 'recalc', function ( ) {
            self.recalc();
        });
    }

    // initate sorting
    Sortable.prototype.sorting = function ( ) {
        var self = this;

        // convert jquery element in javascript element
        var htmlElement = self.element.get(0);

        // sortable config
        var config = {
            animation: 200,
            onUpdate: function ( event ) {
                // recalc positions when sorting is updated
                self.recalc();
            }
        }

        // sort handle setup
        if ( self.sortHandle != undefined ) {
            config.handle = self.sortHandle;
        }

        // init sortable
        var sortable = SortableJS.create( htmlElement, config );
    },


    // recalc positions of sortable elements
    Sortable.prototype.recalc = function () {
        var self = this;
        var items = $( self.rowClass );

        // update positions
        items.each( function ( i, el ) {
            var element = $( el );
            var index = parseInt( items.index( element ) );

            // find placeholder within row if not exist check outside row
            var position = element.find( self.sortPosition );

            // is there something to save to?
            if ( position.size() ) {
                position.val( index );
            }
        });
    },


    // removes a row, by checking the delete checkbox and place it as last item
    Sortable.prototype.remove = function ( el, self ) {
        var element = $( el );
        var row = element.closest( self.rowClass );

        // find delete flag
        self.deleteFlagClass = self.element.data( 'delete-flag' );
        self.deleteFlag = row.find( self.deleteFlagClass );

        // flag for deletion if there's a placeholder
        if ( self.deleteFlag.size() ){
            self.deleteFlag.prop( "checked", true );
        }

        // hide row and place it as last
        var wrapper = row.parent();
        row.addClass( 'removed' ).appendTo( wrapper );

        // recalc positions
        self.recalc();
    }

    // initiate
    new Sortable();

})( jQuery, Sortable );