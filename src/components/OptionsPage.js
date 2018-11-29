import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection, Button, Base } from './common';

class OptionsPage extends Component {
  render() {
    return (
      <Base> 
        <Card>
          <Text style={{ fontSize: 18}}>OPTIONS</Text>
          <CardSection>
            <Text>option1</Text>
          </CardSection>

          <CardSection>
            <Text>option2</Text>
          </CardSection>

          <CardSection>
            <Text>option3</Text>
            <Button 
              raised
              title='BUTTON'
              icon={{ name: 'envira', type: 'font-awesome' }}
            />
          </CardSection>
        </Card>
      </Base>
    );
  }
};

export default OptionsPage;


