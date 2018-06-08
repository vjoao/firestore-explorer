<template>
  <div class="container">
    <b-field grouped v-if="!app">
      <hr>
      <b-field>
        <b-input type="string" v-model="projectId" placeholder="Project ID"></b-input>
      </b-field>
      <b-field>
        <b-input type="string" v-model="apiKey" placeholder="API Key"></b-input>
      </b-field>
      <b-field>
        <button  @click="initializeApp" class="button">Initialize app</button>
      </b-field>
    </b-field>
    <div v-if="app">
      <hr>
      <b-field grouped>
        <b-field label="Collection">
          <b-input type="string" placeholder="Collection" v-model="collection"></b-input>
        </b-field>
        <b-field label="Limit">
          <b-input type="number" placeholder="Limit" v-model="limit"></b-input>
        </b-field>
      </b-field>
      <b-field grouped v-for="(query, i) in queries" :key="i">
        <b-input type="string" placeholder="fieldPath" v-model="query.fieldPath"></b-input>
        <b-select v-model="query.opStr" placeholder="operator">
          <option v-for="op in operators" :value="op" :key="op">{{ op }}</option>
        </b-select>
        <b-input type="string" placeholder="value" v-model="query.value"></b-input>
        <button class="button" v-if="i > 0" @click="removeQuery(i)">X</button>
        <button class="button" v-if="i === 0" @click="addQuery">Add</button>
      </b-field>
      <button class="button" @click="performQuery">Perform query</button>
      <hr>
      <pre class="display" ref="preRef">{{ results | pretty }}</pre>
    </div>
  </div>
</template>

<script>
import { firestore, initializeApp, apps } from 'firebase'

export default {
  name: 'home',
  data: () => ({
    queries: [],
    results: [],
    collection: '',
    app: apps[0],
    limit: 5,
    projectId: '',
    apiKey: '',
    operators: ['==', '>=', '>', '<=', '<'],
    isLoading: false
  }),
  filters: {
    pretty (val) {
      return JSON.stringify(val, null, 2)
    }
  },
  computed: {
    columns () {
      if (this.results.length) {
        return Object.keys(this.results[0]).map(key => ({
          field: key,
          label: key
        }))
      }
      return []
    }
  },
  mounted () {
    this.addQuery()
  },
  methods: {
    addQuery () {
      this.queries.push({
        fieldPath: '',
        opStr: '==',
        value: ''
      })
    },
    removeQuery (i) {
      this.queries.splice(i, 1)
    },
    mountQuery () {
      return this.queries.filter(q => q.fieldPath !== '').reduce((prev, curr) => {
        return prev.where(curr.fieldPath, curr.opStr, curr.value)
      }, firestore().collection(this.collection))
    },
    async performQuery () {
      const loading = this.$loading.open({ container: this.$refs.preRef.$el })
      try {
        const queryResults = await this.mountQuery().limit(this.limit || 5).get()
        this.results = queryResults.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      } catch (err) {
        const { message } = err

        if (message.indexOf('index') !== -1) {
          const match = /(https?:\/\/[^ ]*)/
          const indexUrl = message.match(match)[1]
          this.$snackbar.open({
            message: 'This requires an index to be created.',
            indefinite: true,
            type: 'is-warning',
            position: 'is-top',
            actionText: 'Create index',
            onAction () {
              window.open(indexUrl, '_blank')
            }
          })
        } else {
          this.$toast.open({
            message,
            type: 'is-danger',
            duration: 5000
          })
        }
      } finally {
        loading.close()
      }
    },
    async initializeApp () {
      if (apps.length) await this.app.delete()

      this.app = initializeApp({
        apiKey: this.apiKey,
        authDomain: `${this.projectId}.firebaseapp.com`,
        databaseURL: `https://${this.projectId}.firebaseio.com`,
        projectId: this.projectId,
        storageBucket: `${this.projectId}.appspot.com`
      })
    }
  }
}
</script>

<style scoped>
  .display {
    max-height: 600px;
    overflow-y: auto;
    white-space: pre-wrap!important;
  }
</style>
