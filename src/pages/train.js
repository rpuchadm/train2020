import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const TrainPage = () => (
  <Layout>
    <SEO title="Train" />
    <h1>Hi from the Train page</h1>
    <p>Welcome to Train page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default TrainPage
