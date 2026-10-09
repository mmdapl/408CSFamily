import { defineFairyConfig } from '@142vip/fairy-cli'

/**
 * 本仓为单包 VuePress 文档站（无 `pnpm-workspace.yaml`），工程化基座为 `@142vip/fairy-cli`。
 *
 * - `pnpm i` 会执行 `@142vip/fairy-cli` postinstall，合并默认钩子并写入 `.git/hooks`
 * - 覆盖默认 `commitmsg`（去掉 Monorepo `-s`）；关闭 `precommit`
 * - `pnpm check:commit` / `commit-msg`：`npx fa commit --quiet`
 * - `pnpm release`：`npx fa release`（`release.vip` + `checkBranch`）
 */
export default defineFairyConfig({
  hooks: {
    precommit: false,
    commitmsg: 'npx fa commit --quiet',
    preinstall: [
      'npx only-allow pnpm',
      'sh -c \'if [ -d ./scripts ]; then find ./scripts -maxdepth 1 -type f -exec chmod +x {} +; fi\'',
    ],
  },
  commit: {
    quiet: true,
  },
  release: {
    vip: true,
    checkBranch: [
      'next',
      'main',
    ],
  },
})
