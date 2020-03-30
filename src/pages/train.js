import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import TrainContainer from "../components/TrainContainer"

const TrainPage = () => (
  <Layout title='TrainClock'>
    <TrainContainer />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default TrainPage
