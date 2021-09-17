<template>

    <div class="item-wrapper">

        <div class="row row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-2">
            <img class="img-fluid" :src="item.imageUrl" :alt="item.name">
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">{{ item.name }}</h2>
                    <div class="redeem-button-wrapper">
                        <button type="button" class="btn redeem rounded-pill" @click="confirmModal.show()">
                            Redeem
                            <span>&#62;</span>
                        </button>
                    </div>
                    <div class="card-text"><small class="text-muted">{{ stock }} left in stock</small></div>
                </div>
            </div>
        </div>

        <div class="h-devider">&nbsp;</div>

        <div class="d-flex justify-content-between">
            <div class="desc-label">
                <h3>Description</h3>
            </div>
            <div class="desc-devider">&nbsp;</div>
            <div class="desc-content">
                <p>{{ item.description }}</p>
            </div>
        </div>

        <!-- Confirm Modal -->
        <div class="modal fade" ref="confirmRedeem" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" @click="confirmModal.hide()" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <h2 class="card-title text-center" id="confirmRedeemLabel">Are you sure?</h2>
                        <br/>
                        <img class="img-fluid rounded-circle" :src="item.imageUrl" :alt="item.name" width="260" height="260">
                        <br/><br/>
                        <h6>Redeem for {{ item.name }}?</h6>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn yes rounded-pill" @click="confirmRedeem">Yes</button>
                        <button type="button" class="btn cancel rounded-pill" @click="confirmModal.hide()">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sucess Redeem Modal -->
        <div class="modal fade" ref="successRedeem" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" @click="successRedeemModal.hide()" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <h2 class="card-title text-center" id="successRedeemLabel">Congratulations!</h2>
                        <br/><br/>
                        <h6>You redeemed {{ item.name }}.</h6>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn more-prizes rounded-pill" @click="gotoMoreItems">More Prizes</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Zeror Stock Modal -->
        <div class="modal fade" ref="zeroStock" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" @click="zeroStockModal.hide()" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <h2 class="card-title text-center" id="zeroStockRedeemLabel">Sorry, you have {{stock}} available stock!</h2>
                        <br/><br/>
                        <h6>Try again later.</h6>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn more-prizes rounded-pill" @click="gotoMoreItems">More Prizes</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import { Modal } from 'bootstrap'
import axios from "axios"

export default {
    name: 'PrizeItemDetails',
    data: () => ({
        confirmModal: null,
        successRedeemModal: null,
        zeroStockModal: null,
        stock: 0,
        item: {}
        }
    ),
    async mounted() {
        this.confirmModal = new Modal(this.$refs.confirmRedeem)
        this.successRedeemModal = new Modal(this.$refs.successRedeem)
        this.zeroStockModal = new Modal(this.$refs.zeroStock)

        const id = this.$route.params.id
        const response = await axios.get('api/prizeItems/' + id)
        this.item = response.data
        this.stock = response.data.quantity;
    },
    methods: {
        confirmRedeem() {
            if (this.stock > 0) {
                this.reducePrizeStock()
                this.successRedeemModal.show()
            } else {
                this.zeroStockModal.show()
            }
            this.confirmModal.hide()
        },
        gotoMoreItems() {
            this.successRedeemModal.hide()
            this.zeroStockModal.hide()
            this.$router.push('/home')
        },
        async reducePrizeStock() {
            this.stock--
            const id = this.$route.params.id
            await axios.put(`api/prizeItems/${id}`, {"quantity": this.stock} )
        }
    }
}
</script>

<style>
.item-wrapper {
    padding: 4em 8em;
    background-color: #F5F8FA;
}

.redeem-button-wrapper {
    border-top: 2px solid #ECECEC;
    border-bottom: 2px solid #ECECEC;
}

.card-body {
    margin-top: 20px;
}

.yes, .more-prizes {
    background-color: #FFCF0B;
}

.cancel {
    background-color: #EBEBEB;
}

.modal-header {
    border-bottom: 0;
}

.modal-footer {
    border-top: 0;
    margin-bottom: 30px;
}

.desc-devider {
    margin: 0 10px;
}

.h-devider {
  margin-top: 3rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

@media only screen and (max-width: 768px) {
    .item-wrapper {
        padding: 1em 1em;
    }

    .h-devider {
        margin: 0;
        border: 0;
    }

    .card-body {
        line-height: 80px;
    }
}

</style>