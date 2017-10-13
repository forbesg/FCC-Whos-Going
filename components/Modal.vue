<template>
  <div class="modal-container" @click="handleCloseModal">
    <div :class="`modal ${openClass}`" @click="(e) => {e.stopPropagation()}">
      <div class="scroll-container">
        <div class="close-modal" @click="handleCloseModal"><i class="fa fa-close"></i></div>
        <div class="modal-image" :style="{ backgroundImage: `url('${bar.image_url}')` }"></div>
        <div class="modal-content">
          <h2>{{bar.name}}</h2>
          <div class="address">
            <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i>
            <address>
              <span v-for="(line, index) in bar.location.display_address" :key="index">{{line}}<br/></span>
            </address> 
          </div>
          <p><i class="fa fa-phone fa-fw"></i> <a :href="`tel:${bar.phone}`">{{bar.display_phone}}</a></p>
          <p>Open: <span v-if="bar.is_closed">Closed</span><span v-if="!bar.is_closed">Open</span></p>
          <hr>
          <div v-if="reviews" class="reviews">
            <h4>Reviews</h4>
            <div class="review" v-for="(review, index) in reviews" :key="index">
              <header class="user">
                <img :src="review.user.image_url" :alt="review.user.name">
                <h6>{{review.user.name}}</h6>
              </header>
              <article>
                <p>{{review.text}}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  name: 'fg-modal',
  props: ['bar', 'handleModalOpen'],
  data () {
    return {
      openClass: '',
      reviews: null
    }
  },
  methods: {
    handleCloseModal () {
      this.openClass = ''
      setTimeout(() => {
        this.handleModalOpen()
      }, 300)
    }
  },
  mounted () {
    axios.get(`/api/reviews/${this.bar.id}`).then(reviews => {
      this.reviews = reviews.data
    }).catch(err => {
      console.log(err)
    })
    setTimeout(() => {
      this.openClass = 'open'
    }, 200)
  }
}
</script>

<style lang="scss" scoped>
  .modal-container {
    background-color: rgba(68, 68, 68, 0.96);;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: flex-start;;
    align-items: center;
    h1, h2, h3, h4, h5, h6 {
      font-weight: normal;
    }
    .modal {
      background-color: #fff;
      box-shadow: 1px 0 5px #000;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      transform: translateX(-100%);
      transition: transform 0.2s ease-in;
      @media (min-width: 600px) {
        transform: translateX(-400px);
        width: 400px;
      }
      .scroll-container {
        min-height: 100%;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 0.2em;
          background-color: #a22c29;
        }
        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        }
        
        &::-webkit-scrollbar-thumb {
          background-color: #ddd;
          outline: 1px solid #444;
        }
      }
      &.open {
        transform: translateX(0);
      }
      .modal-image {
        height: 400px;
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .modal-content {
        padding: 0 20px;
        .reviews {
          .review {
            display: flex;
            margin-bottom: 20px;
            text-align: left;
            header {
              margin-right: 10px;
              img {
                height: 50px;
                width:50px;
              }
            }
            h6 {
              margin: 0;
            }
            p {
              font-size: 0.8em;
              margin: 0;
            }
          }
        }
      }

      .close-modal {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-color: #fff;
        border-radius: 50%;
        cursor: pointer;
        i.fa {
          color: #444;
        }
        &:hover {
          background-color: #444;
          
          i.fa {
            color: #ddd;
          }
        }
      }
    }
  }
</style>


