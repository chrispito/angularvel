<?php
namespace App;
class Asset
{
  public static $json = null;
  public static function path($file)
  {
    $parts = explode('.', $file);
    // return 'http://localhost:8000/' . $parts[0] . '/' . $parts[1];
    if (self::isLocal()) {
      // if ($parts[1] === 'css') {
      //   return;
      // }
      return 'http://localhost:3003/assets/'.$file;
    }
    if (! self::$json) {
      self::$json = json_decode(file_get_contents(public_path().'/assets/assets.json'));
    }
    return self::$json->{$parts[0]}->{$parts[1]};
  }
  public static function isLocal()
  {
    // return false;
    return strpos($_SERVER['HTTP_HOST'], 'localhost') !== false;
  }
}
