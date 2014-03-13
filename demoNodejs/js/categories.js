
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Annotator.Plugin.Categories = (function(_super) {
    __extends(Categories, _super);

    Categories.prototype.events = {
      'annotationCreated': 'setHighlights',
      'annotationUpdated': 'onAnnotationUpdated',
    };

    Categories.prototype.field = null;

    Categories.prototype.input = null;

    Categories.prototype.options = {
      categories: {}
    };

    function Categories(element, categories) {
      this.setAnnotationCat = __bind(this.setAnnotationCat, this);
      this.setHighlights = __bind(this.setHighlights, this);
      this.onAnnotationUpdated = __bind(this.onAnnotationUpdated, this);
      this.updateField = __bind(this.updateField, this);
      this.options.categories = categories;
      Categories.__super__.constructor.apply(this, arguments);
    }


    Categories.prototype.pluginInit = function() {
      var cat, color, i, isChecked, _ref;
      if (!Annotator.supported()) {
        return;
      }
      i = 0;
      _ref = this.options.categories;
      for (cat in _ref) {
        color = _ref[cat];
        if (i === 0) {
          isChecked = true;
        } else {
          isChecked = false;
        }
        i = i + 1;
        this.field = this.annotator.editor.addField({
          type: 'radio',
          label: cat,
          value: cat,
          hl: color,
          checked: isChecked,
          load: this.updateField,
          submit: this.setAnnotationCat
        });
      }
      this.viewer = this.annotator.viewer.addField({
        load: this.updateViewer
      });
      if (this.annotator.plugins.Filter) {
        this.annotator.plugins.Filter.addFilter({
          label: 'Categories',
          property: 'category',
          isFiltered: Annotator.Plugin.Categories.filterCallback
        });
      }
      return this.input = $(this.field).find(':input');
    };

    Categories.prototype.setViewer = function(viewer, annotations) {
      var v;
      return v = viewer;
    };

    Categories.prototype.onAnnotationUpdated = function(annotation) {
    
     $( "span[id="+annotation.id+"]" ).attr('class','annotator-hl-'+annotation.category);
      console.log('modificar anotacio');
    };

    Categories.prototype.setHighlights = function(annotation) {
      var cat, h, highlights, _i, _len, _results;
      cat = annotation.category;
      highlights = annotation.highlights;
      if (cat) {
        _results = [];
        for (_i = 0, _len = highlights.length; _i < _len; _i++) {
          h = highlights[_i];
          _results.push(h.className = h.className + ' ' + this.options.categories[cat]);
        }
        return _results;
      }
    };

    Categories.prototype.updateField = function(field, annotation) {
      var category;
      category = '';
      if (field.checked = 'checked') {
        category = annotation.category;
      }
      console.log('updateField');
      return this.input.val(category);
    };

    Categories.prototype.setAnnotationCat = function(field, annotation) {
      if (field.childNodes[0].checked) {
        return annotation.category = field.childNodes[0].id;
      }
    };

    Categories.prototype.updateViewer = function(field, annotation) {
      field = $(field);
      field.html('<span class="annotator-hl-' + annotation.category + '">' +$.i18n._(annotation.category).toUpperCase() + '</span>').addClass('annotator-hl-'+ annotation.category );
    };

    return Categories;

  })(Annotator.Plugin);

}).call(this);
