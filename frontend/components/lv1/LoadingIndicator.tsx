import { FC } from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import { StyleConst } from 'styles/const'

const Container = styled.div`
  text-align: center;
`

type Size = 'small'

type Props = {
  size?: Size
  paddingLess?: boolean
}

export const LoadingIndicator: FC<Props> = ({ size, paddingLess }) => {
  const loaderSize: number = (() => {
    switch (size!) {
      case 'small':
        return 44
    }
  })()

  return (
    <Container style={{ padding: paddingLess ? 0 : 32 }}>
      <Loader type="ThreeDots" color={StyleConst.COLOR.PRIMARY} width={loaderSize} height={loaderSize} />
    </Container>
  )
}

LoadingIndicator.defaultProps = { size: 'small', paddingLess: false }
