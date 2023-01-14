import Link from 'next/link'
import styles from './Breadcrumbs.module.css'

const Breadcrumbs = (props: { data?: Array<Map<string, any>> }) => {

  const renderElements = () => {
    const data = props.data ?? []

    if (data.length <= 1) {
      return <></>
    }

    console.log("styles")
    console.log(styles)

    const elements = data.map((item, index) => {

      const label = item.get('label') ?? ''
      const url = item.get('url') ?? ''
      const alt = item.get('alt') ?? ''

      let link = <Link href={url} title={alt} key={index} className={styles['breadcrumb-item']}>{label}</Link>

      console.log('====================================');
      console.log(link);
      console.log('====================================');

      if (index < data.length - 1) {
        return (
          <span key={index} >
            {link}
            <span className={styles['breadcrumb-sep']}> / </span>
          </span>
        )
      }
      else {
        return (
          <span key={index} >
            <span className={styles['breadcrumb-active']}>{label}</span>
          </span>
        )
      }
    })

    return <div className={styles.breadcrumb}> {elements}</div>
  }

  return (
    <>
      {renderElements()}
    </>
  )

}

export default Breadcrumbs;