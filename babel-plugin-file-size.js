/**
 * Babel插件：统计文件编译前后的大小（单位：KB）
 * 核心逻辑：
 * 1. 读取原始代码内容，计算原始大小；
 * 2. 监听Babel的「生成代码完成」钩子，获取编译后代码，计算编译后大小；
 * 3. 输出文件名称、原始大小、编译后大小、体积变化率。
 */
module.exports = function({ types: t }) {
  return {
    // 插件名称（必填，用于报错/日志标识）
    name: 'file-size-plugin',
    // 「程序」节点进入时触发（每个文件只执行一次）
    pre(file) {
      // 1. 保存原始代码内容和大小
      const originalCode = file.code;
      file.set('originalSize', Buffer.byteLength(originalCode, 'utf8') / 1024); // 转KB
      file.set('filename', file.opts.filename || 'unknown-file.js'); // 保存文件名
    },
    // 代码生成完成后触发（获取编译后代码）
    post(file) {
      // 2. 获取编译后代码和大小
      const generatedCode = file.code;
      const generatedSize = Buffer.byteLength(generatedCode, 'utf8') / 1024; // 转KB
      
      // 3. 读取预存的原始大小和文件名
      const originalSize = file.get('originalSize');
      const filename = file.get('filename');
      
      // 4. 计算体积变化率
      const changeRate = ((generatedSize - originalSize) / originalSize * 100).toFixed(2);
      const changeDesc = changeRate >= 0 ? `+${changeRate}%` : `${changeRate}%`;

      // 5. 输出统计结果（格式化打印）
      console.log('\n===== Babel 文件大小统计 =====');
      console.log(`文件名称：${filename}`);
      console.log(`原始大小：${originalSize.toFixed(2)}KB`);
      console.log(`编译后大小：${generatedSize.toFixed(2)}KB`);
      console.log(`体积变化：${changeDesc}`);
      console.log('==============================\n');
    }
  };
};