/* editor bar
 */

function EditorBar (actions) {
  var plugins = actions.getPlugins()
  var options = {
    html: [ 'HTML', 'Markdown' ]
  }
  var selected = {
    html: '',
    css: '',
    js: ''
  }

  function changeHtml (e) {
    if (this.value === 'markdown') {
      actions.addPlugin('markdown')
    } else {
      actions.removePlugin(selected.html)
    }

    selected.html = this.value
  }

  function createSelect (type, options, selected) {
    return `
      <select class="editor-bar-select editor-bar-select-${type}">
        ${options.map((opt) => {
          return `
            <option value="${opt.toLowerCase()}" ${opt.toLowerCase() === selected ? 'selected' : ''}>
              ${opt}
            </option>
          `
        }).join('')}
      </select>
    `
  }

  function setInitialValues () {
    // TODO on load set select values based on store
    if (plugins.indexOf('markdown') !== -1) {
      selected.html = 'markdown'
    }
  }

  this.mount = function ($container) {
    $container.querySelector('.editor-bar-select-html').addEventListener('change', changeHtml)
  }

  this.render = function () {
    setInitialValues()

    return `
      <div class="editor-bar">
        <div class="editor-bar-pane editor-bar-pane-html">
          ${createSelect('html', options.html, selected.html)}
        </div>
        <div class="editor-bar-pane editor-bar-pane-html">
          <select class="editor-bar-select">
            <option value="css">
              CSS
            </option>
            <option value="less">
              Less
            </option>
            <option value="stylus">
              Stylus
            </option>
          </select>
        </div>
        <div class="editor-bar-pane editor-bar-pane-html">
          <select class="editor-bar-select">
            <option value="javascript">
              JavaScript
            </option>
            <option value="es2015">
              ES2015
            </option>
            <option value="coffeescript">
              CoffeeScript
            </option>
          </select>
        </div>
      </div>
    `
  }
}

module.exports = EditorBar
