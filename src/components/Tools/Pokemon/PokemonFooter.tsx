import Link from "next/link";
import React from "react";

const PokemonFooter = () => {
  return (
    <div className="flex-start">
      <span className="text-sm text-gray-600">
        <span className="blue_gradient">* </span>
        感谢NGA论坛中优秀帖子的指导, 本工具数据都来自
        <Link
          href={"https://bbs.nga.cn/read.php?tid=37121346"}
          className="mx-1 blue_gradient"
        >
          宝可梦数据表
        </Link>
        和
        <Link
          href={"https://bbs.nga.cn/read.php?tid=37354638"}
          className="mx-1 blue_gradient"
        >
          精灵等级评定工具
        </Link>
      </span>
    </div>
  );
};

export default PokemonFooter;
