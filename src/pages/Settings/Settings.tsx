import Layout from '@components/layout'
import SettingsMenu from '@features/SettingsMenu'

export const Settings = () => {
  return (
    <Layout
      orderCard={false}
      subTitle="Pengaturan aplikasi kasir"
      title="Pengaturan"
    >
      <section className="layout page pageHight">
        <SettingsMenu />
      </section>
    </Layout>
  )
}
