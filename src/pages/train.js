import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TrainContainer from "../components/TrainContainer"

const TrainPage = () => (
  <Layout>
    <SEO title="Train" />
    <TrainContainer />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default TrainPage
