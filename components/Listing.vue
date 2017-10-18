<template>
  <div :class="listingClass" @click="toggleExpandClass">
    <div class="listing-image" :style="{ backgroundImage: `url('${listing.image_url}')` }"></div>
    <div class="listing-content">
      <h4>{{listing.name}}</h4>
      <div class="address">
        <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i>
        <address>
          <span v-for="(line, index) in listing.display_address" :key="index">{{line}}<br/></span>
        </address> 
      </div>
      <p><i class="fa fa-phone fa-fw"></i> <a :href="`tel:${listing.phone}`">{{ listing.display_phone}}</a></p>
      <p>Open: <span v-if="listing.is_closed">Closed</span><span v-if="!listing.is_closed">Open</span></p>
      <h4>Going - Count {{listing.going.length}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fg-listing',
  data () {
    return {
      listingClass: 'listing'
    }
  },
  props: ['listing', 'handleModalOpen', 'index'],
  methods: {
    toggleExpandClass (e) {
      this.handleModalOpen(this.index)
    }
  }
}
</script>

<style lang="scss">
  .listing {
    background-color: #fff;
    border: 1px solid #fff;
    box-sizing: border-box;
    display: flex;
    font-size: 0.8em;
    flex: 1 0 275px;
    flex-direction: column;
    margin: 10px 5px;
    padding: 5px;
    transition: border 0.2s linear, transform 0.2s linear;
    @media (min-width: 848px) {
      flex: 1 0 400px;
      flex-direction: row;
    }
    &:hover {
      border: 1px solid #a0a0a0;
      cursor: pointer;
      transform: scale(1.03);
    }
    .listing-image {
      background-size: cover;
      flex: 1;
      height: 300px;
      margin: 5px;
      transition: flex 0.5s linear, height 0.5s linear;
      @media (min-width: 848px) {
        flex: 0 0 150px;
        height: 150px;
      }
      img {
        width: 100%;
      }
    }
    .listing-content {
      padding: 10px; 
      text-align: left;
      .address {
        display: flex;
      }
      h4 {
        margin: 0 0 10px 0;
      }
    }
    &.expanded {
      position: fixed;
      top: 50%;
      margin-top: -125px;
      flex: 1 0 100%;
      width: 60%;
      height: 250px;
      .listing-image {
        background-size: cover;
        flex: 0 0 230px;
        height: 230px;
      }
    }
  }
</style>


