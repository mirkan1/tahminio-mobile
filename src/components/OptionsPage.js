import React from 'react'
import { Text } from 'react-native'
import { Card, CardSection } from './common'

const OptionsPage = () => {
  return (
    <Card>
      <Text style={{ fontSize: 18 }}>OPTIONS</Text>
      <CardSection>
        <Text>option1</Text>
      </CardSection>

      <CardSection>
        <Text>option2</Text>
      </CardSection>

      <CardSection>
        <Text>option3</Text>
      </CardSection>
    </Card>
  )
}

export default OptionsPage;