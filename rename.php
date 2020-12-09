<?php

$rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(__DIR__));

$basePath = __DIR__;

$files = array();
$hash = [];

foreach ($rii as $file) {

    if ($file->isDir()){ 
        continue;
    }

    // Ensureing we are skipping mesa files.
    if (strpos($file->getPathname(), $basePath . '/.git') === 0) {
        continue;
    }

    $santizePath = str_replace($basePath ,"", $file->getPathname());
    if (strpos($santizePath, '-') !== false) {

        $fileName = end(explode("/", $santizePath));
        $automationPath = str_replace("$fileName","",  $file->getPathname());
        $renameFile = $basePath .  str_replace("-","_",  "$santizePath");
        $oldFile = $file->getPathname();

        if (empty($hash[$automationPath])) {
            $hash[$automationPath] = $basePath .  str_replace("-","_",  str_replace($fileName,"",  "$santizePath"));
            if (!file_exists($hash[$automationPath])) {
                mkdir($hash[$automationPath], 0777, true);
            }
        }


        // Deleting files
        RemoveEmptySubFolders($automationPath);

        // Renaming files
        exec("mv $oldFile $renameFile");

        $files[] = $renameFile; 
    }

}

foreach ($files as $filePath) {

    $fileName = end(explode("/", $filePath));
    $automationKey = str_replace("/$fileName","", str_replace(__DIR__ . "/", "", $filePath));
    $rawData = file_get_contents($filePath);

    if (endsWith($filePath, 'mesa.json')) {
        $data = json_decode($rawData, true);
        $data['key'] = $automationKey;
        file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES ));
    } else {
        $mesaJsonFile = str_replace($fileName, "" , $filePath) . "mesa.json";
        $data = file_get_contents($mesaJsonFile);



        // Building the old name
        $oldFileName = str_replace("_", "-", $fileName);

        var_dump($mesaJsonFile);
        var_dump($oldFileName);

        // replacing it from the files.
        $data = str_replace($oldFileName, $fileName, $data);
        file_put_contents($mesaJsonFile, $data);
    }

}

function RemoveEmptySubFolders($path)
{
  $empty=true;
  foreach (glob($path.DIRECTORY_SEPARATOR."*") as $file)
  {
     $empty &= is_dir($file) && RemoveEmptySubFolders($file);
  }
  return $empty && rmdir($path);
}

function endsWith( $haystack, $needle ) {
    $length = strlen( $needle );
    if( !$length ) {
        return true;
    }
    return substr( $haystack, -$length ) === $needle;
}

echo json_encode($files, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES);
