/**
 * jQuery plugin for observing forms on changes
 *
 * @author Nikolay Zmachinsky
 */
(function($){
    var options = {
        'dataAttr': 'form-observe-state',
        'trackNodesSelector': 'form, .form-observe'
    };

    function findFormNode(node){
        var node = $(node);
        return  node.is(options.trackNodesSelector) ? node : node.find(options.trackNodesSelector);
    }

    $.fn.extend({
        /**
         * saves the current state of the form
         */
        formObserve: function(){
            var forms = findFormNode(this);
            forms.each(function(){
                var form = $(this);
                form.data(options.dataAttr, form.find(':input').serialize());
            });

            return this;
        },

        /**
         * check if the form was updated since formObserve was called
         */
        formChanged: function(){
            var changed = false;
            var forms = findFormNode(this);
            forms.each(function(){
                var form = $(this);
                var storedData = form.data(options.dataAttr);
                if (storedData !== undefined && form.find(':input').serialize() != storedData){
                    changed = true;
                    return false;
                }
            });

            return changed;
        }
    });
})(jQuery);
