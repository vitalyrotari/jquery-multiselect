(($) ->
  class MultiFields
    constructor: (@container, options) ->
      @rows = @container.children().addClass("multifields-row")
      @rows.each () ->
        $(@).append("<div class=\"multifields-row-buttons\" />");

      @row = @rows.eq(0).clone()
      @row.find("[disabled]").removeAttr("disabled").val("")

      maxData = @container.data("maxFields")
      titleData = @container.data("title")

      @options =
        max: if maxData then maxData else 5
        title: if titleData then titleData else 5
        buttons:
          add: "<a href=\"#\">add</a>"
          del: "<a href=\"#\">delete</a>"

      if options
        event.extend(@options, options)

      @buttons =
        add: $(@options.buttons.add).addClass("multifields-add-field")
        del: $(@options.buttons.del).addClass("multifields-del-field")

      @init()

    init: () ->
      @updateRows()
      @updateButtons()

      @container.on "click", "a.multifields-add-field", { MultiFields: @ }, (evt) ->
        evt.preventDefault()
        evt.data.MultiFields.add()

      @container.on "click", "a.multifields-del-field", { MultiFields: @ }, (evt) ->
        evt.preventDefault()
        row = $(@).closest(".multifields-row")
        index = evt.data.MultiFields.rows.index(row)
        evt.data.MultiFields.remove(index)

      return @

    add: () ->
      if @rows.length < @options.max
        row = @row.clone()
        num = @rows.length + 1

        @container.append(row).trigger("MultiFields.add", row)
        @update()

        row.find("input:text").eq(0).focus()

      return @

    remove: (index) ->
      if index > 0
        @rows.eq(index).remove()
        @container.trigger("MultiFields.remove", index)
        @update()

      return @

    update: () ->
      @updateRows()
      @updateNames()
      @updateButtons()
      @container.trigger("MultiFields.update")

      return @

    updateButtons: () ->
      max = @options.max
      count = @rows.length

      # Create new buttons for existing fields
      @rows.find(".multifields-add-field, .multifields-del-field").remove().end().each (index, row) =>
        row = $(row)
        inputs = row.find(".multifields-row-buttons")

        if inputs.length <= 0
          inputs = row

        if max != count and count is (index + 1)
          inputs.append(@buttons.add.clone())

        if index > 0
          inputs.append(@buttons.del.clone())

      return @

    updateNames: () ->
      @rows.each (number) ->
        # Update ID attribute for labels
        $(@).find("label[for]").each () ->
          $(@).attr("for", (i, attr) ->
            id = attr.replace(/\_[0-9]+\_{1,2}/, "_#{number}_")
            return id
          )

        # Update ID and Name attributes for fields
        $(@).find("[name]").each () ->
          $(@).attr("name", (i, attr) ->
            name = attr.replace(/\[[0-9]+\]{1,2}/, "[#{number}]")
            return name
          ).attr("id", (i, attr) ->
            id = attr.replace(/\_[0-9]+\_{1,2}/, "_#{number}_")
            return id
          )

      return @

    updateRows: () ->
      @rows = @container.children()
      return @

  $(document).ready () ->
    $(".multifields").each () ->
      elem = $(@)
      obj = new MultiFields(elem)
      elem.data("form.MultiFields", obj)


  $.MultiFields = MultiFields
).call this, jQuery