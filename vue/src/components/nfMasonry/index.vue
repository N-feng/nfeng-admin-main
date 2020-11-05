<template>
  <div class="masonry">
    <div class="column"
         v-for="(item, key) in masonryList"
         :key="key"
         :style="style">
      <div class="item"
           v-for="(el, k) in item"
           :key="k">
        <div class="item__content">
          <a-card hoverable
                  style="width: 100%;">
            <img alt="example"
                 :src="el.url"
                 slot="cover" />
            <template class="ant-card-actions"
                      slot="actions">
              <!-- <a-icon type="setting" /> -->
              <a-icon type="edit" />
              <a-popconfirm title="Are you sure delete this item?"
                            @confirm="$emit('handleDelete', el)">
                <a-icon type="delete" />
              </a-popconfirm>

            </template>
            <a-card-meta :title="el.name"
                         :description="el.url">
              <!-- <a-avatar slot="avatar"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> -->
            </a-card-meta>
          </a-card>
          <!-- <img :src="el.url"
               alt=""> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nfMasonry',
  props: {
    imgList: {
      type: Array,
    },
    column: {
      type: Number,
      default: 4,
    },
  },
  computed: {
    masonryList() {
      const newArr = []
      const colArr = []
      for (let i = 0; i < this.column; i += 1) {
        colArr.push(i)
      }
      colArr.forEach((index) => {
        this.imgList.forEach((item, key) => {
          if (key % this.column === index) {
            if (newArr[index]) {
              newArr[index].push(item)
            } else {
              newArr[index] = [item]
            }
          }
        })
      })

      return newArr
    },
    style() {
      return {
        width: `${100 / this.column}%`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=PT+Mono");

@function set-counter-bg-color($color) {
  @if (lightness($color) > 50) {
    @return darken($color, 60%);
  } @else {
    @return lighten($color, 50%);
  }
}

$bg: #0d0630;
$itemBg1: #18314f;
$itemBg2: #8bbeb2;
$itemBg3: #e6f9af;
$itemBg4: #384e77;

@mixin setColorAndHover($baseColor) {
  color: $baseColor;
  &:hover {
    background: lighten($baseColor, 8%);
  }
}

body,
html {
  position: relative;
  width: 100%;
  height: 100%;
  background: $bg;
  font-family: "PT Mono", monospace;
}

.masonry {
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 500px) {
    flex-direction: row;
  }
}

.column {
  display: flex;
  flex-flow: column wrap;
  // width: 100%;

  @media only screen and (max-width: 500px) {
    width: 100% !important;
  }
}

.item {
  box-sizing: border-box;
  padding: 10px;
  counter-increment: item-counter;
  width: 100%;

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    // height: 220px;
    font-size: 40px;
    // border: 1px solid darken($bg, 5%);
    // background: currentColor;
    box-sizing: border-box;
    // @include setColorAndHover($itemBg1);
    // padding: 10px;

    img {
      width: 100%;
    }

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 13px;
      width: 2em;
      height: 2em;
      line-height: 2em;
      text-align: center;
      font-weight: bold;
      background-color: set-counter-bg-color($itemBg1);
      // content: counter(item-counter);
    }

    &:after {
      color: darken($bg, 10%);
      // content: "ಠ‿ಠ";
    }

    &--small {
      @include setColorAndHover($itemBg2);
      height: 100px;

      &:before {
        background: set-counter-bg-color($itemBg2);
      }

      &:after {
        content: "♥◡♥";
      }
    }

    &--medium {
      @include setColorAndHover($itemBg3);
      height: 175px;

      &:before {
        background: set-counter-bg-color($itemBg3);
      }

      &:after {
        content: "◔ᴗ◔";
      }
    }

    &--large {
      @include setColorAndHover($itemBg4);
      height: 280px;

      &:before {
        background: set-counter-bg-color($itemBg4);
      }

      &:after {
        content: "ಠ_๏";
      }
    }
  }
}
</style>
