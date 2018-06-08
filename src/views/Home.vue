<template>
  <div class="container">
    <hr>
    <b-field grouped>
      <b-field label="projectId">
        <b-input type="string" v-model="projectId"></b-input>
      </b-field>
      <b-field label="apiKey">
        <b-input type="string" v-model="apiKey"></b-input>
      </b-field>
    </b-field>
    <hr>
    <b-field grouped >
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
        <option value="==">==</option>
        <option value=">=">>=</option>
        <option value="<="><=</option>
        <option value="<"><</option>
        <option value=">">></option>
      </b-select>
      <b-input type="string" placeholder="value" v-model="query.value"></b-input>
      <button v-if="i > 0" @click="removeQuery(i)">X</button>
      <button v-if="i === 0" @click="addQuery">Add</button>
    </b-field>
    <button @click="performQuery">Perform query</button>
    <pre class="display">{{ results | pretty }}</pre>
  </div>
</template>

<script>
//ts-check

import { firestore, initializeApp } from 'firebase'

export default {
  name: 'home',
  data: () => ({
    queries: [],
    results: [],
    collection: '',
    app: null,
    limit: 5,
    projectId: '',
    apiKey: ''
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
      if(!this.app)
        this.initializeApp()

      const queryResults = await this.mountQuery().limit(this.limit || 5).get()
      this.results = queryResults.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },
    async initializeApp () {
      if (this.app) await this.app.delete()

      this.app = initializeApp({
        apiKey: this.apiKey,
        authDomain: `${this.projectId}.firebaseapp.com`,
        databaseURL: `https://${this.projectId}.firebaseio.com`,
        projectId: this.projectId,
        storageBucket: `${this.projectId}.appspot.com`,
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
