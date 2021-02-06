<template>
	<div class="contents">
		<div class="clearfix">
			<CategoryList v-if="categories" :data="categories"/>
			<div class="column content">
				<ProductList v-if="!isEdit" :data="products" @showAddForm="isEdit = true"/>
        <EditProduct v-if="isEdit" :data="data" @onSave="update(data)" :bundle="false"/>
			</div>
		</div>
	</div>
</template>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}
.column {
  float: left;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
.menu {
  width: 25%;
  padding-left: 100px;
  /* margin-top: 1.3%; */
}
.content {
  width: 70%;
}
.contents {
  /* margin-top: -20px; */
  margin-bottom: 2%;
}
.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.active {
  background-color:  #ffe1a6;
}
.menu li {
  padding: 8px;
	border: 1px solid #cccccc;
  padding-top: 15px;
  height: 51px;
}
.content{
	margin: 0% 3% 3% 0%;
}
.column1{
	float: left;
  width: 50%;
  padding: 10px;
  height: 300px;
}
</style>
<script>
import ProductList from 'modules/generic/products/ProductList.vue'
import EditProduct from 'modules/generic/products/EditProduct.vue'
import CategoryList from 'modules/generic/products/CategoryList.vue'
import axios from 'axios'
export default {
  data() {
    return {
      isActive: false,
      hasError: false,
      isEdit: false,
      data: null,
      categories: null,
      products: null,
      firstRetrieve: true,
      token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2MDQ1NjEwNDEsImV4cCI6MTkxOTkyMTA0MSwiaXNzIjoiaHR0cHM6Ly9tdHNiYWNrZW5kZGV2LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjpbImh0dHBzOi8vbXRzYmFja2VuZGRldi5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiLCJub3BfYXBpIl0sImNsaWVudF9pZCI6IjkzZTZjNDNlLTJjOTUtNGY3Yi04YzJiLWEwMTA5YmExODFiYyIsInN1YiI6IjkzZTZjNDNlLTJjOTUtNGY3Yi04YzJiLWEwMTA5YmExODFiYyIsImF1dGhfdGltZSI6MTYwNDU2MTAzOSwiaWRwIjoibG9jYWwiLCJzY29wZSI6WyJub3BfYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.qRvEbcmpAPO-qhMBJqk0jDCNbl_BsmBdVStz76P2uLQi37uS6SoitQ5AV31M8PijiOaLbJQQ4uddRpI7P45virWUseq7wq1Xi9KDpKduo9bnRKFHu3UwBJJo_Wmgl86V_tNiJpey7Xdswr80E6rWFCL-Nneh9kfcs9ka-Igg2cwLb0Hlt1BHd42IB-700S9g5SIQir4vcWPbWkotMyik2NORXwjS7lnta_lXlTnxC4xWMREMpBwt4x6J9eLLunmy9Dj6LypLWt20C-JEiCvBHEjDff0QviVEIcnsqys0CucZUQ-jCD3-jHoFPCC79-PmSFojcmXVG-M0FcON8iLArw'
    }
  },
  mounted() {
    this.retrieveCategories()
  },
  watch: {
    $route(to, from){
      console.log(to)
      this.isEdit = false
    }
  },
  components: {
    ProductList,
    CategoryList,
    EditProduct
  },
  methods: {
    redirectEdit(){
      this.isEdit = false
    },
    setActive(id) {
      this.isEdit = false
      let active = document.getElementsByClassName('list')
      for (var i = 0; i < active.length; i++) {
        active[i].className = active[i].className.replace('active', '')
      }
      active[id].classList.add('active')
    },
    retrieveCategories() {
      $('#loading').css({'display': 'block'})
      this.APIGetRequest('/get_deli_shop_categories?storeId=' + 1, response => {
        $('#loading').css({'display': 'none'})
        if(response.categories.length > 0) {
          this.categories = response.categories
          if(this.firstRetrieve === true) {
            this.retrieveProducts(this.categories[0].id)
            this.firstRetrieve = false
          }
        } else {
          this.categories = null
        }
      })
    },
    retrieveProducts(id) {
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`/products?CategoryId=${id}`, response => {
        $('#loading').css({'display': 'none'})
        if(response.products.length > 0) {
          this.products = response.products
        } else {
          this.products = null
        }
      })
    },
    retrieveOneProduct(id) {
      $('#loading').css({'display': 'block'})
      axios.get(`https://mtsbackenddev.azurewebsites.net/api/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data !== null) {
          this.data = response.data.products[0]
        } else {
          this.data = null
        }
      })
    },
    update(id){
      console.log(id)
      if(id.localized_names[0].localized_names !== '' && id.localized_names[0].localized_names !== null && id.full_description !== '' && id.price !== '' && id.special_price !== '' && id.special_price !== null){
        $('#loading').css({'display': 'block'})
        id.images[0].src = 'https://mtsbackenddev.azurewebsites.net/images/thumbs/0000021_build-your-own-computer.jpeg'
        this.APIPutRequest(`/products/${id.id}?Dto[Id]=${id.id}&Dto[LocalizedNames][LocalizedName]=${id.localized_names[0].localized_name}&Dto[FullDescription]=${id.full_description}&Dto[Price]=${id.price}&Dto[SpecialPrice]=${id.special_price}&Dto[CategoryType]=${id.category_type}&Dto[VisibleIndividually]=${id.visible_individually}&Dto[Name]=${id.name}&Dto[LocalizedNames][LanguageId]=${id.localized_names[0].language_id}&Dto[ShortDescription]=${id.short_description}&Dto[ShowOnHomePage]=${id.show_on_home_page}&Dto[MetaKeywords]=${id.meta_keywords}&Dto[MetaDescription]=${id.meta_description}&Dto[MetaTitle]=${id.meta_title}&Dto[AllowCustomerReviews]=${id.allow_customer_reviews}&Dto[ApprovedRatingSum]=${id.approved_rating_sum}
        &Dto[NotApprovedRatingSum]=${id.not_approved_rating_sum}&Dto[ApprovedTotalReviews]=${id.approved_total_reviews}&Dto[NotApprovedTotalReviews]=${id.not_approved_total_reviews}&Dto[Sku]=${id.sku}&Dto[ManufacturerPartNumber]=${id.manufacturer_part_number}
        &Dto[Gtin]=${id.gtin}&Dto[IsGiftCard]=${id.is_gift_card}&Dto[RequireOtherProducts]=${id.require_other_products}&Dto[AutomaticallyAddRequiredProducts]=${id.automatically_add_required_products}&Dto[IsDownload]=${id.is_download}&Dto[UnlimitedDownloads]=${id.unlimited_downloads}
        &Dto[MaxNumberOfDownloads]=${id.max_number_of_downloads}&Dto[DownloadExpirationDays]=${id.download_expiration_days}&Dto[HasSampleDownload]=${id.has_sample_download}&Dto[HasUserAgreement]=${id.has_user_agreement}&Dto[IsRecurring]=${id.is_recurring}&Dto[RecurringCycleLength]=${id.recurring_cycle_length}
        &Dto[RecurringTotalCycles]=${id.recurring_total_cycles}&Dto[IsRental]=${id.is_rental}&Dto[RentalPriceLength]=${id.rental_price_length}&Dto[IsShipEnabled]=${id.is_ship_enabled}&Dto[IsFreeShipping]=${id.is_free_shipping}&Dto[ShipSeparately]=${id.ship_separately}&Dto[AdditionalShippingCharge]=${id.additional_shipping_charge}
        &Dto[IsTaxExempt]=${id.is_tax_exempt}&Dto[IsTelecommunicationsOrBroadcastingOrElectronicServices]=${id.is_telecommunications_or_broadcasting_or_electronic_services}&Dto[UseMultipleWarehouses]=${id.use_multiple_warehouses}&Dto[ManageInventoryMethodId]=${id.manage_inventory_method_id}&Dto[StockQuantity]=${id.stock_quantity}&Dto[DisplayStockAvailability]=${id.display_stock_availability}
        &Dto[DisplayStockQuantity]=${id.display_stock_quantity}&Dto[MinStockQuantity]=${id.min_stock_quantity}&Dto[NotifyAdminForQuantityBelow]=${id.notify_admin_for_quantity_below}&Dto[AllowBackInStockSubscriptions]=${id.allow_back_in_stock_subscriptions}&Dto[OrderMinimumQuantity]=${id.order_minimum_quantity}&Dto[OrderMaximumQuantity]=${id.order_maximum_quantity}&Dto[AllowedQuantities]=${id.allowed_quantities}
        &Dto[AllowAddingOnlyExistingAttributeCombinations]=${id.allow_adding_only_existing_attribute_combinations}&Dto[DisableBuyButton]=${id.disable_buy_button}&Dto[DisableWishlistButton]=${id.disable_wishlist_button}&Dto[AvailableForPreOrder]=${id.available_for_pre_order}&Dto[PreOrderAvailabilityStartDateTimeUtc]=${id.pre_order_availability_start_date_time_utc}
        &Dto[CallForPrice]=${id.call_for_price}&Dto[OldPrice]=${id.old_price}&Dto[ProductCost]=${id.product_cost}&Dto[SpecialPriceStartDateTimeUtc]=${id.special_price_start_date_time_utc}&Dto[SpecialPriceEndDateTimeUtc]=${id.special_price_end_date_time_utc}
        &Dto[CustomerEntersPrice]=${id.customer_enters_price}&Dto[MinimumCustomerEnteredPrice]=${id.minimum_customer_entered_price}&Dto[MaximumCustomerEnteredPrice]=${id.maximum_customer_entered_price}&Dto[BasepriceEnabled]=${id.baseprice_enabled}&Dto[BasepriceAmount]=${id.baseprice_amount}&Dto[BasepriceBaseAmount]=${id.baseprice_base_amount}&Dto[HasTierPrices]=${id.has_tier_prices}
        &Dto[HasDiscountsApplied]=${id.has_discounts_applied}&Dto[Weight]=${id.weight}&Dto[Length]=${id.length}&Dto[Width]=${id.width}&Dto[Height]=${id.height}&Dto[AvailableStartDateTimeUtc]=${id.available_start_date_time_utc}&Dto[AvailableEndDateTimeUtc]=${id.available_end_date_time_utc}
        &Dto[DisplayOrder]=${id.display_order}&Dto[Published]=${id.published}&Dto[Deleted]=${id.deleted}&Dto[CreatedOnUtc]=${id.created_on_utc}&Dto[UpdatedOnUtc]=${id.updated_on_utc}&Dto[ProductType]=${id.product_type}&Dto[ParentGroupedProductId]=${id.parent_grouped_product_id}
        &Dto[RoleIds]=${[]}&Dto[DiscountIds]=${[]}&Dto[StoreIds]=${id.store_ids[0]}&Dto[ManufacturerIds]=${[]}&Dto[Images][Src]=${id.images[0].src}&Dto[Images][Attachment]=${id.images[0].attchment}&Dto[Images][Binary]=${''}&Dto[Images][MimeType]=${''}&Dto[Images][Id]=${id.images[0].id}
        &Dto[Images][PictureId]=${id.images[0].picture_id}&Dto[Images][Position]=${id.images[0].position}&Dto[ProductAttributeMappings][Id]=${0}&Dto[ProductAttributeMappings][ProductAttributeId]=${0}&Dto[ProductAttributeMappings][ProductAttributeName]=${''}
        &Dto[ProductAttributeMappings][TextPrompt]=${''}&Dto[ProductAttributeMappings][IsRequired]=${true}&Dto[ProductAttributeMappings][AttributeControlTypeId]=${0}&Dto[ProductAttributeMappings][DisplayOrder]=${0}
        &Dto[ProductAttributeMappings][DefaultValue]=${''}&Dto[ProductAttributeMappings][AttributeControlType]=${''}&Dto[ProductAttributeMappings][ProductAttributeValues][Id]=${0}
        &Dto[ProductAttributeMappings][ProductAttributeValues][AttributeValueTypeId]=${0}&Dto[ProductAttributeMappings][ProductAttributeValues][AssociatedProductId]=${[]}&Dto[ProductAttributeMappings][ProductAttributeValues][Name]=${''}
        &Dto[ProductAttributeMappings][ProductAttributeValues][ColorSquaresRgb]=${''}&Dto[ProductAttributeMappings][ProductAttributeValues][ImageSquaresImage][Src]=${''}
        &Dto[ProductAttributeMappings][ProductAttributeValues][ImageSquaresImage][Attachment]=${''}&Dto[ProductAttributeMappings][ProductAttributeValues][ImageSquaresImage][Binary]=${''}
        &Dto[ProductAttributeMappings][ProductAttributeValues][ImageSquaresImage][MimeType]=${''}&Dto[ProductAttributeMappings][ProductAttributeValues][PriceAdjustment]=${0}
        &Dto[ProductAttributeMappings][ProductAttributeValues][WeightAdjustment]=${0}&Dto[ProductAttributeMappings][ProductAttributeValues][Cost]=${0}&Dto[ProductAttributeMappings][ProductAttributeValues][Quantity]=${0}
        &Dto[ProductAttributeMappings][ProductAttributeValues][IsPreSelected]=${true}&Dto[ProductAttributeMappings][ProductAttributeValues][DisplayOrder]=${0}&Dto[ProductAttributeMappings][ProductAttributeValues][PictureId]=${0}
        &Dto[ProductAttributeMappings][ProductAttributeValues][ProductPictureId]=${0}&Dto[ProductAttributeMappings][ProductAttributeValues][AttributeValueType]=${''}&Dto[ProductAttributeCombinations][Id]=${0}
        &Dto[ProductAttributeCombinations][ProductId]=${0}&Dto[ProductAttributeCombinations][AttributesXml]=${''}&Dto[ProductAttributeCombinations][StockQuantity]=${0}&Dto[ProductAttributeCombinations][Sku]=${''}
        &Dto[ProductAttributeCombinations][ManufacturerPartNumber]=${''}&Dto[ProductAttributeCombinations][Gtin]=${''}&Dto[ProductAttributeCombinations][OverriddenPrice]=${0}&Dto[ProductAttributeCombinations][PictureId]=${0}
        &Dto[ProductSpecificationAttributes][Id]=${0}&Dto[ProductSpecificationAttributes][ProductId]=${0}&Dto[ProductSpecificationAttributes][AttributeTypeId]=${0}&Dto[ProductSpecificationAttributes][SpecificationAttributeOptionId]=${0}
        &Dto[ProductSpecificationAttributes][CustomValue]=${''}&Dto[ProductSpecificationAttributes][AllowFiltering]=${true}&Dto[ProductSpecificationAttributes][ShowOnProductPage]=${true}&Dto[ProductSpecificationAttributes][DisplayOrder]=${0}
        &Dto[ProductSpecificationAttributes][AttributeType]=${''}&Dto[ProductSpecificationAttributes][SpecificationAttributeOption][Id]=${0}&Dto[ProductSpecificationAttributes][SpecificationAttributeOption][SpecificationAttributeId]=${0}
        &Dto[ProductSpecificationAttributes][SpecificationAttributeOption][Name]=${''}&Dto[ProductSpecificationAttributes][SpecificationAttributeOption][ColorSquaresRgb]=${''}
        &Dto[ProductSpecificationAttributes][SpecificationAttributeOption][DisplayOrder]=${0}&Dto[AssociatedProductIds]=${[]}&Dto[Tags]=${[]}&Dto[VendorId]=${id.vendor_id}&Dto[SeName]=${id.se_name}`, {}, response => {
          console.log('update', response)
        }, error => {
          console.log(error)
        })
          // $('#loading').css({'display': 'none'})
          // if(response.data !== null) {
          //   this.data = response.data.products[0]
          // } else {
          //   this.data = null
          // }
      }
    }
  }
}
</script>
