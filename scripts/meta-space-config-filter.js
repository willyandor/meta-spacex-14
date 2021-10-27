const fs = require('hexo-fs');
const { deepMerge } = require('hexo-util');
const path = require('path');

// eslint-disable-next-line no-undef
hexo.extend.filter.register('after_init', async function () {
  const { base_dir, render } = this;

  const metaConfigPath = path.join(base_dir, 'meta-space-config.yml');
  const isExists = await fs.exists(metaConfigPath);
  if (!isExists) return;

  const metaConfig = await render.render({ path: metaConfigPath });
  const { user, site } = metaConfig;
  const auroraConfig = {};

  if (site && user) {
    auroraConfig.site = {
      author: user.username,
      nick: user.nickname,
      subtitle: site.subtitle,
      description: site.description,
      language: site.language,
      logo: site.avatar,
      avatar: site.avatar,
    }
  }

  this.config.theme_config = deepMerge(this.config.theme_config, auroraConfig);
});
