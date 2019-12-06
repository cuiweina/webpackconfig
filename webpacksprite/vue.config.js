const path = require('path')
const Spritesmith = require('webpack-spritesmith')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const templateFunction = function (data) {
  var shared = '.icon { display: inline-block; vertical-align: middle; background-image: url(I) }'.replace(
    'I',
    data.sprites[0].image
  )
  var perSprite = data.sprites
    .map(function (sprite) {
      return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
        .replace('N', sprite.name)
        .replace('W', sprite.width)
        .replace('H', sprite.height)
        .replace('X', sprite.offset_x)
        .replace('Y', sprite.offset_y)
    })
    .join('\n')

  return shared + '\n' + perSprite
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
  },
  configureWebpack: {
    plugins: [
      new Spritesmith({
        src: {
          cwd: path.resolve(__dirname, 'src/assets/sprites'),
          glob: '*.png'
        },
        target: {
          image: path.resolve(__dirname, 'public/icon.png'),
          css: [[path.resolve(__dirname, 'public/icon.sprite.css'), { format: 'function_based_template' }]]
        },
        apiOptions: {
          // css中图片引入路径，同级直接写图片名称即可
          cssImageRef: 'icon.png'
        },
        // 生成样式文件模板
        customTemplates: {
          function_based_template: templateFunction
        },
        spritesmithOptions: {
          algorithm: 'top-down' // 拼接雪碧图的方式binary-tree，left-right等
          // padding: 10// 图片之间的间距
        }
      })
    ]
  }
}
