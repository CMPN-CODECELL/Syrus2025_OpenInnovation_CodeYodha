import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

def crop_suitability_fuzzy_system():
    # Fuzzy variables
    soil_moisture = ctrl.Antecedent(np.arange(0, 101, 1), 'soil_moisture')
    temperature = ctrl.Antecedent(np.arange(0, 51, 1), 'temperature')
    crop_suitability = ctrl.Consequent(np.arange(0, 101, 1), 'crop_suitability')
    
    # Fuzzy membership functions and rules here