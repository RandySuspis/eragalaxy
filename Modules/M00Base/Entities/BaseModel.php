<?php

namespace Modules\M00Base\Entities;

use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{

    public static function getStructure()
    {
        // this must be overwritten
        trigger_error("Check GetStructure on model", E_USER_ERROR);
    }



    public static function getStructureWithName($searchName)
    {
        $structure = static::getStructure();
        if (isset($structure[$searchName])) {
            return $structure[$searchName];
        } else {
            return null;
        }
    }

    public static function createStructureText($name, $label, $type = 'text', $placeholder = null, $validation = null, $extra = null)
    {
        $result = array();
        $result['name'] = $name;
        $result['label'] = $label;
        $result['type'] = $type;
        $result['placeholder'] = $placeholder;
        $result['validation'] = $validation;
        $result['extra'] = $extra;
        return $result;
    }

    public static function createStructureTextView($name, $label, $placeholder = null, $validation = null, $extra = null)
    {
        $result = array();
        $result['name'] = $name;
        $result['label'] = $label;
        $result['type'] = 'textarea';
        $result['placeholder'] = $placeholder;
        $result['validation'] = $validation;
        $result['extra'] = $extra;
        return $result;
    }

    public static function createStructureDate($name, $label, $placeholder = null, $validation = null, $extra = null)
    {
        $result = array();
        $result['name'] = $name;
        $result['label'] = $label;
        $result['type'] = 'date';
        $result['placeholder'] = $placeholder;
        $result['validation'] = $validation;
        $result['extra'] = $extra;
        return $result;
    }

    public static function createStructureSelect(
        $name,
        $label,
        $placeholder = null,
        $options = ['this must be changed','urgent','3'],
        $validation = null,
        $extra = null
    ) {
        $result = array();
        $result['name'] = $name;
        $result['label'] = $label;
        $result['type'] = 'select';
        $result['placeholder'] = $placeholder;
        $result['validation'] = $validation;
        $result['extra'] = $extra;
        if (is_array($options)) {
            $result['option'] = $options;
        } elseif (is_string($options)) {
            $result['optionAjax'] = $options;
        }

        return $result;
    }

    public static function createStructureRadio(
        $name,
        $label,
        $options = ['this must be changed','urgent','3'],
        $validation = null,
        $extra = null
    ) {
        $result = array();
        $result['name'] = $name;
        $result['label'] = $label;
        $result['type'] = 'radio';
        $result['validation'] = $validation;
        $result['extra'] = $extra;
        $result['option'] = $options;
        return $result;
    }

}
