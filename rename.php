<?php

$rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(__DIR__));

$files = array(); 

foreach ($rii as $file) {

    if ($file->isDir()){ 
        continue;
    }

    // Ensureing we are skipping mesa files.
    if (strpos($file->getPathname(), '/Users/darryl/Projects/mesa-templates/.git') === 0) {
        continue;
    }

    // Ensuring we are only changing mesa.json files
    if (!endsWith($file->getPathname(), 'mesa.json')) {
        continue;
    }
    $data = json_decode(file_get_contents($file->getPathname()), true);

    if (strpos($data['key'], '-') !== false) {
        $data['key'] = str_replace("-","_", $data['key']);
        file_put_contents($file->getPathname(), json_encode($data, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES ));
        $files[] = $file->getPathname(); 
    }
}

function endsWith( $haystack, $needle ) {
    $length = strlen( $needle );
    if( !$length ) {
        return true;
    }
    return substr( $haystack, -$length ) === $needle;
}

echo json_encode($files, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES);
