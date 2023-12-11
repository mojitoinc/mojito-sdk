"use client";

import styles from './page.module.css'
import MixersLayout from './component/Mixers'

export default function Home() {
  return (
    <main className={styles.main}>
      <MixersLayout />
    </main>
  )
}
