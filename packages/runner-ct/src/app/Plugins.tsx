import cs from 'classnames'
import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import State from '../lib/state'
import { Hidden } from '../lib/Hidden'
import { namedObserver } from '../lib/mobx'
import { PLUGIN_BAR_HEIGHT } from './RunnerCt'

import styles from './RunnerCt.module.scss'

interface PluginsProps {
  state: State
  pluginsHeight: number
  pluginRootContainerRef: React.MutableRefObject<HTMLDivElement>
}

export const Plugins = namedObserver('Plugins',
  (props: PluginsProps) => (
    <Hidden
      type="layout"
      hidden={!props.state.isAnyPluginToShow}
      className={styles.ctPlugins}
    >
      <div className={styles.ctPluginsHeader}>
        {props.state.plugins.map((plugin) => (
          <button
            key={plugin.name}
            className={cs(styles.ctPluginToggleButton)}
            onClick={() => props.state.openDevtoolsPlugin(plugin)}
          >
            <span className={styles.ctPluginsName}>
              {plugin.name}
            </span>
            <div
              className={cs(styles.ctTogglePluginsSectionButton, {
                [styles.ctTogglePluginsSectionButtonOpen]: props.state.isAnyDevtoolsPluginOpen,
              })}
            >
              <FontAwesomeIcon
                icon='chevron-up'
                className={styles.ctPluginsName}
              />
            </div>
          </button>
        ))}
      </div>
      <Hidden
        ref={props.pluginRootContainerRef}
        type="layout"
        className={styles.ctPluginsContainer}
        // deal with jumps when inspecting element
        hidden={!props.state.isAnyDevtoolsPluginOpen}
        style={{ height: props.pluginsHeight - PLUGIN_BAR_HEIGHT }}
      />
    </Hidden>
  ))
