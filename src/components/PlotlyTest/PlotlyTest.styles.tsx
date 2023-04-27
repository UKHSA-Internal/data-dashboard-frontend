import styled from 'styled-components'

type ContainerProps = {
  show: boolean
}

export const Container = styled.div<ContainerProps>`
  display: ${(props: ContainerProps) => (props.show ? 'inline' : 'none')};
`
