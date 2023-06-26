# DDCat SiteD Plugin 多多猫插件

## API Interface

```typescript
// GET /all.json
interface PluginInfoAll {
    updateTime: int
    data: PluginInfo[]
}

// GET /{$plugin_id}.json
interface PluginInfo {
    id: string // plugin id
    version: number // plugin version
    url: string // download url
    expr: string // plugin site match patten
    author?: string // plugin author
    logo?: string // plugin logo
    desc?: string // plugin description
    time?: string // plugin update time, format: YYYY-MM-DD
}
```

